import { useState } from "react";
import { useTheme } from '../contexts/ThemeContext.jsx';
import { useInView } from '../hooks/useInView.js';
import { Reveal } from './Reveal.jsx';
import { JOBS } from '../data/experience.js';

export function ExperienceSection() {
  const t = useTheme();
  const [ref, inView] = useInView();
  const [active, setActive] = useState(0);

  return (
    <section id="experience" style={{ padding: "9rem 4rem", maxWidth: 900, margin: "0 auto", scrollMarginTop: "80px" }}>
      <div ref={ref}>
        <Reveal>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.22em", color: t.accent, textTransform: "uppercase", marginBottom: "1.25rem", transition: "color 0.3s" }}>Experience</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: t.text, margin: "0 0 3.5rem", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.015em", transition: "color 0.3s" }}>
            Where I've contributed.
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "0 3rem" }}>
          {/* Tabs */}
          <div style={{ display: "flex", flexDirection: "column", borderRight: `1px solid ${t.border}`, transition: "border-color 0.3s" }}>
            {JOBS.map((j, i) => (
              <button key={i} onClick={() => setActive(i)}
                style={{
                  fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", letterSpacing: "0.06em",
                  textAlign: "left", padding: "1.25rem 1.5rem 1.25rem 0",
                  background: "none", border: "none", cursor: "pointer",
                  color: active === i ? t.text : t.subtle,
                  borderRight: active === i ? `2px solid ${t.accent}` : "2px solid transparent",
                  marginRight: -1,
                  transition: "color 0.2s, border-color 0.2s",
                  textTransform: "uppercase",
                  lineHeight: 1.5,
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                }}>
                {j.logo === "🚀" ? (
                  <span style={{ fontSize: "1.8rem", paddingLeft: "20px" }}>🚀</span>
                ) : (
                  <span style={{ fontSize: "1.8rem", paddingLeft: "20px" }}>{j.logo}</span>
                )}
                <div>
                  <div>{j.co}</div>
                  <div style={{ fontSize: "0.72rem", color: t.faint, marginTop: 2, transition: "color 0.3s" }}>{j.period}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{ paddingTop: "0.5rem" }}>
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.55rem", color: t.text, marginBottom: "0.4rem", transition: "color 0.3s" }}>{JOBS[active].role}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.8rem", color: t.subtle, letterSpacing: "0.08em", transition: "color 0.3s" }}>{JOBS[active].co} · {JOBS[active].location}</div>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem" }}>
              {JOBS[active].bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", gap: "0.85rem", marginBottom: "1.2rem", fontFamily: "'Lora', serif", fontSize: "1.05rem", color: t.muted, lineHeight: 1.8, transition: "color 0.3s" }}>
                  <span style={{ color: t.accent, marginTop: "0.4rem", flexShrink: 0, fontSize: "0.55rem", transition: "color 0.3s" }}>◆</span>
                  {b}
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {JOBS[active].skills.map((s, i) => (
                <span key={i} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.08em", color: t.subtle, border: `1px solid ${t.border}`, padding: "0.35rem 0.85rem", borderRadius: 2, transition: "color 0.3s, border-color 0.3s" }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
