import { useState, useEffect, useRef, createContext, useContext } from "react";

/* ── THEME ─────────────────────────────────────────────────────── */
const ThemeCtx = createContext();
const useTheme = () => useContext(ThemeCtx);

const light = {
  bg:         "#FAF8F4",
  bgNav:      "rgba(250,248,244,0.92)",
  bgPill:     "#F0EDE6",
  bgBtn:      "#1A1A1A",
  bgBtnHov:   "#333",
  bgRolePill: "rgba(184,134,11,0.07)",
  text:       "#1A1A1A",
  textBtn:    "#FAF8F4",
  muted:      "#4A4A4A",
  subtle:     "#6B6B6B",
  faint:      "#999",
  border:     "#E0DCD3",
  borderNav:  "#E8E4DC",
  borderPill: "#D8D4CC",
  accent:     "#B8860B",
  line:       "#E0DCD3",
};

const dark = {
  bg:         "#0F0F0F",
  bgNav:      "rgba(15,15,15,0.92)",
  bgPill:     "#1A1A1A",
  bgBtn:      "#F0EDE6",
  bgBtnHov:   "#D8D4CC",
  bgRolePill: "rgba(201,168,76,0.1)",
  text:       "#F0EDE6",
  textBtn:    "#0F0F0F",
  muted:      "#B0ADA8",
  subtle:     "#7A7774",
  faint:      "#444",
  border:     "#2A2A2A",
  borderNav:  "#1E1E1E",
  borderPill: "#333",
  accent:     "#C9A84C",
  line:       "#2A2A2A",
};

/* ── HOOKS ─────────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useTypewriter(words, speed = 80, pause = 2400) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[wi];
    let t;
    if (!del && ci < w.length) t = setTimeout(() => setCi(c => c + 1), speed);
    else if (!del) t = setTimeout(() => setDel(true), pause);
    else if (del && ci > 0) t = setTimeout(() => setCi(c => c - 1), speed / 2);
    else { setDel(false); setWi(i => (i + 1) % words.length); }
    setDisplay(w.slice(0, ci));
    return () => clearTimeout(t);
  }, [ci, del, wi, words, speed, pause]);
  return display;
}

/* ── REVEAL ────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, y = 18 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : `translateY(${y}px)`,
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ── LINE ──────────────────────────────────────────────────────── */
function Line({ inView }) {
  const t = useTheme();
  return (
    <div style={{
      height: 1, background: t.line,
      transformOrigin: "left",
      transform: inView ? "scaleX(1)" : "scaleX(0)",
      transition: "transform 0.9s cubic-bezier(.22,1,.36,1)",
    }} />
  );
}

/* ── THEME TOGGLE ──────────────────────────────────────────────── */
function ThemeToggle({ isDark, toggle }) {
  const t = isDark ? dark : light;
  const [hov, setHov] = useState(false);
  return (
    <button onClick={toggle} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      title={isDark ? "Light mode" : "Dark mode"}
      style={{
        width: 44, height: 26, borderRadius: 100, border: `1px solid ${hov ? t.accent : t.border}`,
        background: isDark ? t.accent : t.bgPill, cursor: "pointer", position: "relative",
        transition: "background 0.35s, border-color 0.25s", flexShrink: 0, padding: 0,
      }}>
      <span style={{ position: "absolute", left: 6, top: "50%", transform: "translateY(-50%)", fontSize: "0.55rem", opacity: isDark ? 0 : 0.5, transition: "opacity 0.3s", pointerEvents: "none" }}>☀️</span>
      <span style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", fontSize: "0.55rem", opacity: isDark ? 0.7 : 0, transition: "opacity 0.3s", pointerEvents: "none" }}>🌙</span>
      <div style={{ position: "absolute", top: 3, left: isDark ? 20 : 3, width: 18, height: 18, borderRadius: "50%", background: isDark ? "#0F0F0F" : "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.2)", transition: "left 0.3s cubic-bezier(.22,1,.36,1)" }} />
    </button>
  );
}

/* ── NAV ───────────────────────────────────────────────────────── */
function Nav({ isDark, toggle }) {
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
      padding: "1.5rem 4rem", display: "flex", justifyContent: "space-between", alignItems: "center",
      background: scrolled ? t.bgNav : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${t.borderNav}` : "none",
      transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
    }}>
      <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.15rem", color: t.text, transition: "color 0.3s" }}>Mit Sheth</span>
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

/* ── HERO ──────────────────────────────────────────────────────── */
function Hero() {
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
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.12em", color: t.subtle, textTransform: "uppercase", transition: "color 0.3s" }}>Looking for Summer 2026</span>
        </div>
      </div>

      <h1 style={{ ...s(0.2), fontFamily: "'Instrument Serif', serif", fontSize: "clamp(3.8rem, 8vw, 7rem)", lineHeight: 1.02, color: t.text, margin: "0 0 1.5rem", fontWeight: 400, letterSpacing: "-0.02em", transition: "color 0.3s" }}>
        Building software<br />
        that ships &<br />
        <em style={{ color: t.accent, transition: "color 0.3s" }}>actually scales.</em>
      </h1>

      <div style={{ ...s(0.35), fontFamily: "'DM Mono', monospace", fontSize: "1.05rem", color: t.subtle, marginBottom: "2.5rem", minHeight: "1.6rem", transition: "color 0.3s" }}>
        {typed}<span style={{ animation: "blink 1s step-end infinite", color: t.accent }}>_</span>
      </div>

      <div style={{ ...s(0.45) }}>
        <p style={{ fontFamily: "'Lora', serif", fontSize: "1.1rem", color: t.muted, lineHeight: 1.9, maxWidth: 520, margin: "0 0 2.5rem", transition: "color 0.3s" }}>
          CS student at Carleton (AI/ML). I've shipped production software at RBC, Manulife, AIM Defence, and a stealth NYC startup across full-stack engineering, computer vision, and operations. I build things people actually use.
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

/* ── EXPERIENCE ────────────────────────────────────────────────── */
const JOBS = [
  {
    co: "Stealth Startup", period: "Apr – Sept 2025", location: "New York, NY", role: "Chief of Staff Intern",
    bullets: [
      "Co-developed pitch materials for a pre-seed fundraise, helping close the company's first 6-figure raise.",
      "Worked directly with the CEO on B2B outreach and onboarded 10,000+ early users, translating friction into product insights.",
      "Built platform features and growth tooling with AI-assisted development; recruited Ivy League PhD-level talent.",
    ],
    skills: ["Go-to-Market", "Investor Relations", "AI Tooling", "B2B Sales"],
  },
  {
    co: "Manulife", period: "Apr – Aug 2025", location: "Toronto, ON", role: "Software Engineer Intern",
    bullets: [
      "Built an automated PDF policy parser in Python/Go, saving ~40 hours/week of manual processing for operations.",
      "Built claims portal UI in Vue.js + TypeScript — 65% faster page loads, 30% fewer validation errors.",
      "Implemented fraud detection service in Go flagging $50K in suspicious claims; built React deployment dashboard cutting monitoring time 90 → 15 min/cycle.",
    ],
    skills: ["Python", "Go", "Vue.js", "TypeScript", "React"],
  },
  {
    co: "AIM Defence", period: "Jan – Apr 2025", location: "Vancouver, BC", role: "Software Engineer Intern",
    bullets: [
      "Wrote C++ modules for coordinate transforms between camera and world-space, feeding real-time position data at 30+ FPS.",
      "Built a Go tool to auto-detect annotation issues across 200,000+ drone training samples.",
      "Containerized a CV inference pipeline with Docker, cutting setup from 50 → 7 min and saving $3,700/month in cloud costs.",
    ],
    skills: ["C++", "Go", "Docker", "Computer Vision", "ML Pipelines"],
  },
  {
    co: "Royal Bank of Canada", period: "Sep – Dec 2024", location: "Toronto, ON", role: "Software Engineer Intern",
    bullets: [
      "Built reusable React components resolving accessibility issues for 1,000,000+ users with disabilities across RBC's core platforms.",
      "Created a Node.js CLI in TypeScript to automate accessibility audits, cutting front-end debugging time by 60%.",
      "Built JS integration test suites with PostgreSQL, improving coverage from 45% → 78% and cutting test runtime by 5 hours/cycle.",
    ],
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "Accessibility"],
  },
];

function ExperienceSection() {
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

        <div style={{ display: "grid", gridTemplateColumns: "210px 1fr", gap: "0 3rem" }}>
          {/* Tabs */}
          <div style={{ display: "flex", flexDirection: "column", borderRight: `1px solid ${t.border}`, transition: "border-color 0.3s" }}>
            {JOBS.map((j, i) => (
              <button key={i} onClick={() => setActive(i)}
                style={{
                  fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.06em",
                  textAlign: "left", padding: "1rem 1.25rem 1rem 0",
                  background: "none", border: "none", cursor: "pointer",
                  color: active === i ? t.text : t.subtle,
                  borderRight: active === i ? `2px solid ${t.accent}` : "2px solid transparent",
                  marginRight: -1,
                  transition: "color 0.2s, border-color 0.2s",
                  textTransform: "uppercase",
                  lineHeight: 1.5,
                }}>
                <div>{j.co}</div>
                <div style={{ fontSize: "0.64rem", color: t.faint, marginTop: 2, transition: "color 0.3s" }}>{j.period}</div>
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{ paddingTop: "0.5rem" }}>
            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.35rem", color: t.text, marginBottom: "0.3rem", transition: "color 0.3s" }}>{JOBS[active].role}</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.72rem", color: t.subtle, letterSpacing: "0.08em", transition: "color 0.3s" }}>{JOBS[active].co} · {JOBS[active].location}</div>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.75rem" }}>
              {JOBS[active].bullets.map((b, i) => (
                <li key={i} style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", fontFamily: "'Lora', serif", fontSize: "0.98rem", color: t.muted, lineHeight: 1.8, transition: "color 0.3s" }}>
                  <span style={{ color: t.accent, marginTop: "0.4rem", flexShrink: 0, fontSize: "0.5rem", transition: "color 0.3s" }}>◆</span>
                  {b}
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {JOBS[active].skills.map((s, i) => (
                <span key={i} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.08em", color: t.subtle, border: `1px solid ${t.border}`, padding: "0.3rem 0.75rem", borderRadius: 2, transition: "color 0.3s, border-color 0.3s" }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── PROJECTS ──────────────────────────────────────────────────── */
const PROJECTS = [
  {
    title: "Times AI",
    tag: "iOS · Swift / SwiftUI",
    stat: "1,500+",
    statLabel: "Active Users",
    desc: "Education app helping kids learn multiplication. 5-star rating on the App Store. Proprietary ML algorithm adapts difficulty in real-time based on performance patterns. Offline-first architecture.",
    link: "https://apps.apple.com/ca/app/times-ai/id6754301554",
  },
  {
    title: "Self-Driving Simulation",
    tag: "Python · Deep Learning",
    stat: "CNN",
    statLabel: "Real-Time",
    desc: "Trained a convolutional neural network to predict steering angles from live camera frames in a driving simulation. Pipeline includes YUV color conversion, Gaussian blur, data augmentation (pan, zoom, brightness), and MSE-optimized training for real-time vehicle control decisions.",
    link: "https://github.com/MitSheth7/Self-Driving-Simulation",
    linkLabel: "GitHub ↗",
  },
];

function ProjectCard({ p, i, inView }) {
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

function ProjectsSection() {
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

/* ── CONTACT ───────────────────────────────────────────────────── */
function ContactSection() {
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

/* ── FOOTER ────────────────────────────────────────────────────── */
function Footer() {
  const t = useTheme();
  return (
    <footer style={{ borderTop: `1px solid ${t.border}`, padding: "1.75rem 4rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", transition: "border-color 0.3s" }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: t.faint, letterSpacing: "0.1em", transition: "color 0.3s" }}>© 2025 Mit Sheth</span>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: t.faint, letterSpacing: "0.1em", transition: "color 0.3s" }}>Carleton University · Toronto, CA</span>
    </footer>
  );
}

/* ── APP ───────────────────────────────────────────────────────── */
export default function App() {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? dark : light;

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Lora:ital,wght@0,400;1,400&family=DM+Mono:wght@300;400&display=swap');
      *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { overflow-x: hidden; -webkit-font-smoothing: antialiased; }
      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-thumb { background: #C8C4BC; }
      @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
    `;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  return (
    <ThemeCtx.Provider value={theme}>
      <div style={{ background: theme.bg, minHeight: "100vh", transition: "background 0.35s ease", color: theme.text }}>
        <Nav isDark={isDark} toggle={() => setIsDark(d => !d)} />
        <Hero />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    </ThemeCtx.Provider>
  );
}
