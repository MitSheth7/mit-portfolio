import { useState, useEffect } from "react";

export function useTypewriter(words, speed = 80, pause = 2400) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  
  useEffect(() => {
    const w = words[wi];
    let t;
    
    if (!del && ci < w.length) {
      t = setTimeout(() => setCi(c => c + 1), speed);
    } else if (!del) {
      t = setTimeout(() => setDel(true), pause);
    } else if (del && ci > 0) {
      t = setTimeout(() => setCi(c => c - 1), speed / 2);
    } else {
      setDel(false);
      setWi(i => (i + 1) % words.length);
    }
    
    setDisplay(w.slice(0, ci));
    return () => clearTimeout(t);
  }, [ci, del, wi, words, speed, pause]);
  
  return display;
}
