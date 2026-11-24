"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/portfolio";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = ["home", ...navItems].map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: "-42% 0px -52%", threshold: 0 });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return <header className="site-header">
    <a className="skip-link" href="#main">Skip to content</a>
    <nav className="nav-shell" aria-label="Primary navigation">
      <a className="brand" href="#home" aria-label="Abhijeet Gupta, home"><span>ABHIJEET</span></a>
      <button className="menu-button" type="button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(value => !value)}>{open ? <X /> : <Menu />}<span className="sr-only">Toggle navigation</span></button>
      <div id="mobile-nav" className={`nav-links ${open ? "is-open" : ""}`}>
        {navItems.map((item, index) => <a key={item} href={`#${item}`} aria-current={active === item ? "location" : undefined} onClick={() => setOpen(false)}><span>0{index + 1}</span>{item}</a>)}
        <a className="resume-link" href="#contact" onClick={() => setOpen(false)}>Let’s talk</a>
      </div>
    </nav>
  </header>;
}
