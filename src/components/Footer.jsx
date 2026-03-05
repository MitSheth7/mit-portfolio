import { useTheme } from '../contexts/ThemeContext.jsx';

export function Footer() {
  const t = useTheme();
  return (
    <footer style={{ borderTop: `1px solid ${t.border}`, padding: "1.75rem 4rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", transition: "border-color 0.3s" }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: t.faint, letterSpacing: "0.1em", transition: "color 0.3s" }}>© 2025 Mit Sheth</span>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: t.faint, letterSpacing: "0.1em", transition: "color 0.3s" }}>Carleton University · Toronto, CA</span>
    </footer>
  );
}
