import { useState, useEffect } from "react";
import { useTheme } from '../contexts/ThemeContext.jsx';
import { ThemeToggle } from './ThemeToggle.jsx';

export function Nav({ isDark, toggle }) {
  const t = useTheme();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "1.5rem 4rem", display: "flex", justifyContent: "center", alignItems: "center",
      background: scrolled ? t.bgNav : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${t.borderNav}` : "none",
      transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
    }}>
      <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
        {["Experience", "Projects", "Contact"].map(l => (
          <a key={l}
            href={`#${l.toLowerCase()}`}
            onClick={e => {
              e.preventDefault();
              document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.16em", textTransform: "uppercase", color: t.subtle, textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = t.text}
            onMouseLeave={e => e.currentTarget.style.color = t.subtle}
          >{l}</a>
        ))}
        <ThemeToggle isDark={isDark} toggle={toggle} />
      </div>
    </nav>
  );
}
