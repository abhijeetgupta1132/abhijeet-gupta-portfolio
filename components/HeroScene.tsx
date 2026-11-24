"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

export function HeroScene() {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 70, damping: 18 });
  const sy = useSpring(y, { stiffness: 70, damping: 18 });
  const photoX = useTransform(sx, [-.5, .5], [-9, 9]);
  const photoY = useTransform(sy, [-.5, .5], [-7, 7]);
  const discX = useTransform(sx, [-.5, .5], [14, -14]);
  const discY = useTransform(sy, [-.5, .5], [10, -10]);

  function move(event: React.PointerEvent<HTMLDivElement>) {
    if (reduced || event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - .5);
    y.set((event.clientY - rect.top) / rect.height - .5);
  }
  function reset() { x.set(0); y.set(0); }

  return <div className="reference-portrait" aria-label="Portrait of Abhijeet Gupta" onPointerMove={move} onPointerLeave={reset}>
    <motion.div className="portrait-red-disc" style={{ x: discX, y: discY }} aria-hidden="true" />
    <div className="portrait-orbit orbit-one" aria-hidden="true" />
    <div className="portrait-orbit orbit-two" aria-hidden="true" />
    <div className="portrait-slash slash-one" aria-hidden="true" />
    <div className="portrait-slash slash-two" aria-hidden="true" />
    <motion.div className="hero-photo-motion" style={{ x: photoX, y: photoY }}>
      <Image className="hero-photo" src="/abhijeet-red-portrait.png" alt="Abhijeet Gupta, Full Stack Engineer" width={1200} height={1344} sizes="(max-width: 760px) 92vw, 50vw" fetchPriority="high" />
    </motion.div>
  </div>;
}
