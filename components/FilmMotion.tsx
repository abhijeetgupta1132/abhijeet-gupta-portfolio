"use client";

import { useEffect, useRef } from "react";

export function Count({ value }: { value: number }) {
  const target = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = target.current;
    if (!el) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      function update(time: number) {
        const progress = Math.min(1, (time - start) / 1600);
        el!.textContent = String(Math.round(value * (1 - (1 - progress) ** 2)));
        if (progress < 1) frame = requestAnimationFrame(update);
      }
      frame = requestAnimationFrame(update);
    });
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  return <span ref={target}>{value}</span>;
}
