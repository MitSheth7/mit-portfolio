import { useState } from "react";
import { useTheme, light, dark } from '../contexts/ThemeContext.jsx';

export function ThemeToggle({ isDark, toggle }) {
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
