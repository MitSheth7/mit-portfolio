import { useState } from "react";
import { ThemeCtx, light, dark } from './contexts/ThemeContext.jsx';
import { Nav } from './components/Nav.jsx';
import { Hero } from './components/Hero.jsx';
import { ExperienceSection } from './components/ExperienceSection.jsx';
import { ProjectsSection } from './components/ProjectsSection.jsx';
import { ContactSection } from './components/ContactSection.jsx';
import { Footer } from './components/Footer.jsx';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? dark : light;

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
