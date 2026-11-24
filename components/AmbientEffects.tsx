"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

const particles = Array.from({ length: 34 }, (_, index) => ({
  left: `${(index * 43) % 97}%`, top: `${(index * 67) % 91}%`,
  delay: `${(index % 11) * -1.05}s`, duration: `${7 + (index % 8) * 1.15}s`,
  size: `${2 + (index % 4) * 1.5}px`, drift: `${-30 + (index % 7) * 10}px`,
}));

export function AmbientEffects() {
  const [paused, setPaused] = useState(false);
  function toggle() {
    setPaused(value => {
      const next = !value;
      document.documentElement.classList.toggle("motion-paused", next);
      return next;
    });
  }
  return <>
    <div className={`ambient-particles ${paused ? "is-paused" : ""}`} aria-hidden="true">
      {particles.map((p, index) => <i key={index} style={{ "--x": p.left, "--y": p.top, "--delay": p.delay, "--duration": p.duration, "--size": p.size, "--drift": p.drift } as React.CSSProperties} />)}
    </div>
    <button className="reference-motion-toggle" type="button" onClick={toggle}>
      {paused ? <Play /> : <Pause />}<span>{paused ? "Play motion" : "Pause motion"}</span>
    </button>
  </>;
}
