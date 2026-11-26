"use client";

import Image from "next/image";
import { useEffect, useRef, type PointerEvent } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const panels = [
  "M.02 0 H.201 Q.218 0 .232 .027 L.494 .608 Q.502 .628 .489 .655 L.375 .966 Q.367 1 .35 1 H.02 Q0 1 0 .965 V.035 Q0 0 .02 0 Z",
  "M.244 0 H.535 Q.551 0 .565 .028 L.728 .520 Q.737 .547 .717 .557 L.517 .626 Q.504 .631 .494 .605 L.229 .034 Q.215 0 .244 0 Z",
  "M.578 0 H.861 Q.876 0 .865 .025 L.748 .506 Q.735 .545 .723 .512 L.561 .033 Q.548 0 .578 0 Z",
  "M.901 0 H.98 Q1 0 1 .035 V.965 Q1 1 .98 1 H.399 Q.376 1 .386 .967 L.494 .664 Q.500 .638 .522 .630 L.724 .560 Q.742 .554 .752 .522 L.876 .032 Q.882 0 .901 0 Z",
];

export function FilmHero() {
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = scene.current;
    if (!element) return;
    let cancelled = false;
    let ready = false;
    let inView = false;
    let frame = 0;
    const start = () => {
      if (!ready || !inView || document.hidden || cancelled) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          if (!cancelled && !document.hidden) element.dataset.intro = "playing";
        });
      });
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      start();
    }, { threshold: .2 });
    observer.observe(element);
    document.addEventListener("visibilitychange", start);
    const smoke = new window.Image();
    smoke.src = "/crimson-smoke.webp";
    Promise.allSettled([
      ...Array.from(element.querySelectorAll("img"), image => image.decode()),
      smoke.decode(),
      document.fonts.ready,
    ]).then(() => {
      ready = true;
      start();
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", start);
    };
  }, []);

  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" || !scene.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;
    scene.current.style.setProperty("--pointer-x", `${(px - .5) * 12}px`);
    scene.current.style.setProperty("--pointer-y", `${(py - .5) * 8}px`);
    scene.current.style.setProperty("--light-x", `${event.clientX - bounds.left}px`);
    scene.current.style.setProperty("--light-y", `${event.clientY - bounds.top}px`);
  }

  function reset() {
    scene.current?.style.setProperty("--pointer-x", "0px");
    scene.current?.style.setProperty("--pointer-y", "0px");
  }

  return <section id="home" className="hero-track" aria-label="Introduction">
    <div className="film-hero" data-intro="waiting" ref={scene} onPointerMove={move} onPointerLeave={reset}>
      <div className="film-art" aria-hidden="true">
        <div className="hero-backdrop">
          <div className="smoke"/>
          <Image src="/abhijeet-red-portrait.png" width={1200} height={1312} alt="" className="hero-photo" sizes="(max-width: 900px) 90vw, 54vw" loading="eager"/>
        </div>
        <svg width="0" height="0"><defs>
          <linearGradient id="edge-reflection" x2=".7" y2="1">
            <stop stopColor="#f5f2ef" stopOpacity=".58"/>
            <stop offset=".45" stopColor="#a1a1a6" stopOpacity=".14"/>
            <stop offset=".66" stopColor="#fff" stopOpacity=".8"/>
            <stop offset="1" stopColor="#c82035" stopOpacity=".3"/>
          </linearGradient>
          {panels.map((path, i) => <clipPath id={`panel-${i}`} clipPathUnits="objectBoundingBox" key={i}><path d={path}/></clipPath>)}
        </defs></svg>
        {panels.map((path, i) => <div className={`panel-arrival panel-arrival-${i}`} key={i}><div className={`shard shard-${i}`} style={{clipPath: `url(#panel-${i})`}}>
          <div className="glass-tint"/>
          <svg className="glass-face" viewBox="0 0 1 1" preserveAspectRatio="none">
            <path d={path} fill="none" stroke="url(#edge-reflection)" strokeWidth="1.4" vectorEffect="non-scaling-stroke"/>
            <path className="hover-edge" d={path} fill="none" stroke="#e14451" strokeWidth="1.8" vectorEffect="non-scaling-stroke"/>
          </svg>
        </div></div>)}
        <Image src="/abhijeet-red-portrait.png" width={1200} height={1312} alt="" className="hero-photo mobile-portrait" sizes="90vw" loading="eager"/>
      </div>
      <div className="hero-pointer-light" aria-hidden="true"/>
      <div className="film-copy">
        <h1><span>ABHIJEET</span><span>GUPTA<span className="name-stop">.</span></span></h1>
        <strong>Full stack engineer</strong>
        <div className="hero-actions"><a className="pill lit" href="#projects">View projects <ArrowDownRight size={16}/></a><a className="pill" href="#contact">Get in touch <ArrowUpRight size={16}/></a></div>
      </div>
      <a className="hero-scroll" href="#projects"><span>Scroll to explore</span><ArrowDownRight size={16}/></a>
    </div>
  </section>;
}
