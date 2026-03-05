import { useTheme } from '../contexts/ThemeContext.jsx';
import { useInView } from '../hooks/useInView.js';
import { Reveal } from './Reveal.jsx';
import { Line } from './Line.jsx';

export function ContactSection() {
  const t = useTheme();
  const [ref, inView] = useInView();

  return (
    <section id="contact" style={{ padding: "2rem 4rem 10rem", maxWidth: 900, margin: "0 auto", scrollMarginTop: "80px" }}>
      <div ref={ref}>
        <Line inView={inView} />
        <div style={{ marginTop: "5rem" }}>
          <Reveal delay={0.05}>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.22em", color: t.accent, textTransform: "uppercase", marginBottom: "1.25rem", transition: "color 0.3s" }}>Contact</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: t.text, margin: "0 0 3rem", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.015em", transition: "color 0.3s" }}>
              Let's build something.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div>
              {[
                ["LinkedIn", "Connect professionally", "https://www.linkedin.com/in/mitsheth"],
                ["GitHub", "See the code", "https://github.com/MitSheth7"],
                ["Times AI", "Download the app", "https://apps.apple.com/ca/app/times-ai/id6754301554"],
              ].map(([label, sub, href], i) => (
                <a key={i} href={href} target="_blank" rel="noreferrer"
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 0", borderBottom: `1px solid ${t.border}`, textDecoration: "none", transition: "padding-left 0.25s, border-color 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.paddingLeft = "0.75rem"; e.currentTarget.querySelector(".arr").style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.paddingLeft = "0"; e.currentTarget.querySelector(".arr").style.transform = "none"; }}
                >
                  <div>
                    <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.05rem", color: t.text, transition: "color 0.3s" }}>{label}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: t.subtle, letterSpacing: "0.08em", marginTop: 3, transition: "color 0.3s" }}>{sub}</div>
                  </div>
                  <span className="arr" style={{ color: t.accent, fontSize: "1.1rem", transition: "transform 0.25s, color 0.3s" }}>→</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
