import { createContext, useContext } from "react";

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

export const ThemeCtx = createContext();
export const useTheme = () => useContext(ThemeCtx);
export { light, dark };
