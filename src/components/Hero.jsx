import { useState, useEffect } from "react";
import { useTheme } from '../contexts/ThemeContext.jsx';
import { useTypewriter } from '../hooks/useTypewriter.js';

export function Hero() {
  const t = useTheme();
  const typed = useTypewriter(["Software Engineer", "Chief of Staff", "iOS Developer", "CS + AI/ML Student", "Full-Stack Builder"]);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  const s = (delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "none" : "translateY(20px)",
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}s`,
  });

  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "6rem 4rem 0" }}>
      <div style={{ maxWidth: 900, width: "100%", margin: "0 auto" }}>
      <div style={{ ...s(0.1), marginBottom: "2.5rem" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", background: t.bgPill, border: `1px solid ${t.borderPill}`, padding: "0.4rem 1rem", borderRadius: 100, transition: "background 0.3s, border-color 0.3s" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6BAF80", boxShadow: "0 0 0 2px rgba(107,175,128,0.25)" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.12em", color: t.subtle, textTransform: "uppercase", transition: "color 0.3s" }}>Looking for Summer 2026 Internships</span>
        </div>
      </div>

      <h1 style={{ ...s(0.2), fontFamily: "'Instrument Serif', serif", fontSize: "clamp(3.8rem, 8vw, 7rem)", lineHeight: 1.02, color: t.text, margin: "0 0 1.5rem", fontWeight: 400, letterSpacing: "-0.02em", transition: "color 0.3s" }}>
        Mit Sheth
      </h1>

      <div style={{ ...s(0.35), fontFamily: "'DM Mono', monospace", fontSize: "1.05rem", color: t.subtle, marginBottom: "2.5rem", minHeight: "1.6rem", transition: "color 0.3s" }}>
        {typed}<span style={{ animation: "blink 1s step-end infinite", color: t.accent }}>_</span>
      </div>

      <div style={{ ...s(0.45) }}>
        <p style={{ fontFamily: "'Lora', serif", fontSize: "1.1rem", color: t.muted, lineHeight: 1.9, maxWidth: 520, margin: "0 0 2.5rem", transition: "color 0.3s" }}>
          CS student at Carleton (AI/ML). I was a chief of staff at a startup in NYC. I've shipped production software at RBC, Manulife, and AIM Defence across full-stack engineering, computer vision, and operations. I build things people actually use.
        </p>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          <a href="#experience"
            onClick={e => { e.preventDefault(); document.getElementById("experience")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.85rem 1.8rem", textDecoration: "none", display: "inline-block", background: t.bgBtn, color: t.textBtn, border: `1px solid ${t.bgBtn}`, borderRadius: 2, transition: "background 0.25s, color 0.25s" }}
            onMouseEnter={e => e.currentTarget.style.background = t.bgBtnHov}
            onMouseLeave={e => e.currentTarget.style.background = t.bgBtn}
          >View Experience</a>
          <a href="https://apps.apple.com/ca/app/times-ai/id6754301554" target="_blank" rel="noreferrer"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.85rem 1.8rem", textDecoration: "none", display: "inline-block", background: "transparent", color: t.text, border: `1px solid ${t.borderPill}`, borderRadius: 2, transition: "color 0.25s, border-color 0.25s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = t.borderPill; e.currentTarget.style.color = t.text; }}
          >Times AI ↗</a>
        </div>

        {/* Interests */}
        <div style={{ marginTop: "2.5rem" }}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.16em", color: t.subtle, textTransform: "uppercase", marginBottom: "0.85rem", transition: "color 0.3s" }}>Roles I'm interested in</p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {["Software Engineer", "Chief of Staff", "Operations", "Go-to-Market", "Product"].map((role) => (
              <span key={role} style={{
                fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.08em",
                color: t.accent, border: `1px solid ${t.accent}`, padding: "0.4rem 1rem",
                borderRadius: 100, transition: "background 0.2s, color 0.2s",
                opacity: 0.9,
              }}
                onMouseEnter={e => { e.currentTarget.style.background = t.accent; e.currentTarget.style.color = t.textBtn; e.currentTarget.style.opacity = "1"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = t.accent; e.currentTarget.style.opacity = "0.85"; }}
              >{role}</span>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
