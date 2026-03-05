import { useState } from "react";
import { useTheme } from '../contexts/ThemeContext.jsx';

export function ProjectCard({ p, i, inView }) {
  const t = useTheme();
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: "2.25rem 0", borderBottom: `1px solid ${t.border}`,
        display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: "2rem",
        cursor: "default",
        opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(14px)",
        transition: `opacity 0.6s ease ${i * 0.1 + 0.3}s, transform 0.6s ease ${i * 0.1 + 0.3}s, border-color 0.3s`,
      }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.45rem", color: hov ? t.accent : t.text, transition: "color 0.25s" }}>{p.title}</span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.12em", color: t.subtle, textTransform: "uppercase", border: `1px solid ${t.borderPill}`, padding: "0.2rem 0.6rem", borderRadius: 2, transition: "color 0.3s, border-color 0.3s" }}>{p.tag}</span>
          {p.link && (
            <a href={p.link} target="_blank" rel="noreferrer"
              style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.12em", color: t.accent, textDecoration: "none", transition: "opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.6"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              {p.linkLabel || "App Store ↗"}
            </a>
          )}
        </div>
        <p style={{ fontFamily: "'Lora', serif", fontSize: "0.97rem", color: t.muted, lineHeight: 1.8, margin: 0, maxWidth: 520, transition: "color 0.3s" }}>{p.desc}</p>
      </div>
      <div style={{ textAlign: "right", minWidth: 80 }}>
        <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.8rem", color: t.accent, lineHeight: 1, transform: hov ? "scale(1.08)" : "scale(1)", transition: "transform 0.25s, color 0.3s" }}>{p.stat}</div>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: t.subtle, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4, transition: "color 0.3s" }}>{p.statLabel}</div>
      </div>
    </div>
  );
}
