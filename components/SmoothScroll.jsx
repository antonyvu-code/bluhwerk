'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

// Globaler Smooth-Scroll. Respektiert reduced-motion.
// Legt window.__lenis ab, damit GSAP-Seiten ScrollTrigger anhängen können.
export default function SmoothScroll({ children }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    window.__lenis = lenis;

    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return children;
}
