import { useTheme } from '../contexts/ThemeContext.jsx';

export function Line({ inView }) {
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
