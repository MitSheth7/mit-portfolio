import { useTheme } from '../contexts/ThemeContext.jsx';
import { useInView } from '../hooks/useInView.js';
import { Reveal } from './Reveal.jsx';
import { Line } from './Line.jsx';
import { ProjectCard } from './ProjectCard.jsx';
import { PROJECTS } from '../data/projects.js';

export function ProjectsSection() {
  const t = useTheme();
  const [ref, inView] = useInView();
  return (
    <section id="projects" style={{ padding: "2rem 4rem 9rem", maxWidth: 900, margin: "0 auto", scrollMarginTop: "80px" }}>
      <div ref={ref}>
        <Line inView={inView} />
        <Reveal delay={0.05}>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.22em", color: t.accent, textTransform: "uppercase", margin: "1.25rem 0", transition: "color 0.3s" }}>Projects</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: t.text, margin: "0 0 1rem", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.015em", transition: "color 0.3s" }}>
            Things I've shipped.
          </h2>
        </Reveal>
        <div>
          {PROJECTS.map((p, i) => <ProjectCard key={i} p={p} i={i} inView={inView} />)}
        </div>

        {/* Skills strip */}
        <Reveal delay={0.2}>
          <div style={{ marginTop: "4rem", paddingTop: "3rem", borderTop: `1px solid ${t.border}`, transition: "border-color 0.3s" }}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.18em", color: t.subtle, textTransform: "uppercase", marginBottom: "1.25rem", transition: "color 0.3s" }}>Technical Skills</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {["Python","Go","Java","C/C++","TypeScript","JavaScript","Swift","React","Vue.js","Node.js","AWS","Docker","PostgreSQL","MongoDB","REST APIs","CI/CD","Machine Learning","System Design"].map((s, i) => (
                <span key={i} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.06em", color: t.subtle, border: `1px solid ${t.border}`, padding: "0.35rem 0.8rem", borderRadius: 2, transition: "color 0.2s, border-color 0.2s", cursor: "default" }}
                  onMouseEnter={e => { e.currentTarget.style.color = t.accent; e.currentTarget.style.borderColor = t.accent; }}
                  onMouseLeave={e => { e.currentTarget.style.color = t.subtle; e.currentTarget.style.borderColor = t.border; }}
                >{s}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
