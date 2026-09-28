"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${seen ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Counter({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const { ref, seen } = useInView<HTMLSpanElement>();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1400, 1);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref}>{v.toFixed(decimals)}</span>;
}

export function Typewriter({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i];
    const t = setTimeout(() => {
      if (!del && n < w.length) setN(n + 1);
      else if (!del) setDel(true);
      else if (n > 0) setN(n - 1);
      else { setDel(false); setI((i + 1) % words.length); }
    }, !del && n === w.length ? 1400 : del ? 30 : 65);
    return () => clearTimeout(t);
  }, [n, del, i, words]);
  return <span className="type">{words[i].slice(0, n)}<i className="caret" /></span>;
}

export function FlightBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const f = () => setP(window.scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight));
    f();
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  return (
    <div className="flightbar" aria-hidden="true">
      <div className="trail" style={{ width: `${p * 100}%` }} />
      <svg className="mini" style={{ left: `${p * 100}%` }} viewBox="0 0 64 64"><path fill="currentColor" d="M62 30 40 24 28 4h-6l6 20-14 3-6-8H4l4 13-4 13h4l6-8 14 3-6 20h6l12-20 22-6c3-1 3-4 0-5z" /></svg>
    </div>
  );
}
