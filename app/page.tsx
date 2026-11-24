import Image from "next/image";
import { Atom, Braces, Coffee, Database, Boxes, GitBranch, Server, Mail, Download } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { ContactForm } from "@/components/ContactForm";
import { Count } from "@/components/FilmMotion";
import { projects, siteConfig, skillGroups } from "@/data/portfolio";
import "./film.css";

const portrait = "/abhijeet-red-portrait.png";
const services = [
  ["Full-stack web applications", "Product interfaces, backend logic and deployment for multi-tenant SaaS."],
  ["AI-powered applications", "Streaming AI responses, analysis and third-party model integrations."],
  ["Backend APIs & databases", "Authenticated REST APIs, relational schemas and data validation."],
  ["Business websites & landing pages", "Responsive web experiences built with React and Next.js."],
  ["Deployment & automation", "Docker containers, release pipelines and continuous integration."]
];
const stack = [
  ["React", Atom, "#66dcff"], ["JavaScript", Braces, "#f4df62"], ["Java", Coffee, "#fa9f70"],
  ["Node.js", Server, "#86c982"], ["PostgreSQL", Database, "#8cbcf1"], ["Docker", Boxes, "#58bafa"], ["Git", GitBranch, "#f58b74"]
] as const;

function Heading({ title }: { title: string }) {
  return <header className="film-heading"><h2>{title}.</h2></header>;
}

// Normalized outlines keep the cut and its reflected edge aligned at every size.
const glassPanels = [
  "M.02 0 H.201 Q.218 0 .232 .027 L.494 .608 Q.502 .628 .489 .655 L.375 .966 Q.367 1 .35 1 H.02 Q0 1 0 .965 V.035 Q0 0 .02 0 Z",
  "M.244 0 H.535 Q.551 0 .565 .028 L.728 .520 Q.737 .547 .717 .557 L.517 .626 Q.504 .631 .494 .605 L.229 .034 Q.215 0 .244 0 Z",
  "M.578 0 H.861 Q.876 0 .865 .025 L.748 .506 Q.735 .545 .723 .512 L.561 .033 Q.548 0 .578 0 Z",
  "M.901 0 H.98 Q1 0 1 .035 V.965 Q1 1 .98 1 H.399 Q.376 1 .386 .967 L.494 .664 Q.500 .638 .522 .630 L.724 .560 Q.742 .554 .752 .522 L.876 .032 Q.882 0 .901 0 Z"
];

function HeroArt() {
  return <div className="film-art">
    <svg width="0" height="0" aria-hidden="true"><defs>
      <linearGradient id="edge-reflection" x2=".7" y2="1"><stop stopColor="#fff" stopOpacity=".38"/><stop offset=".45" stopColor="#abb4b7" stopOpacity=".13"/><stop offset=".66" stopColor="#fff" stopOpacity=".85"/><stop offset="1" stopColor="#f18c9e" stopOpacity=".12"/></linearGradient>
      {glassPanels.map((path, index) => <clipPath id={`panel-${index}`} clipPathUnits="objectBoundingBox" key={index}><path d={path}/></clipPath>)}
    </defs></svg>
    {glassPanels.map((path, index) => <div className={`shard shard-${index}`} key={index} style={{clipPath: `url(#panel-${index})`}}>
      <div className="smoke" />
      <Image src={portrait} width={1200} height={1312} alt={index === 0 ? "Abhijeet Gupta" : ""} className="hero-photo" sizes="(orientation: portrait) 98vw, 52vw" loading="eager" fetchPriority={index === 0 ? "high" : undefined}/>
      <svg className="glass-face" viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true">
        <path d={path} fill="none" stroke="url(#edge-reflection)" strokeWidth="3" vectorEffect="non-scaling-stroke"/>
        <path className="hover-edge" d={path} fill="none" stroke="#ff506f" strokeWidth="3" vectorEffect="non-scaling-stroke"/>
      </svg>
    </div>)}
  </div>;
}

const projectTraces = {
  api: "M4 32H28M28 32C50 32 40 10 62 10H110M28 32H110M28 32C50 32 40 54 62 54H110",
  stream: "M3 32H18L22 24L27 41L34 9L42 54L49 22L55 39L62 13L70 47L77 26L83 37L89 30H111",
  chart: "M3 53L16 44L28 48L42 30L51 36L66 19L77 28L92 11L100 16L112 5"
};

export default function Home() {
  return <div className="film film-on">
    <Navigation/>
    <div className="atmosphere" aria-hidden="true">{Array.from({length: 56}, (_, i) =>
      <i key={i} style={{left: (i * 41 % 101) + "%", top: (i * 63 % 103) + "%", animationDelay: -i * 1.41 + "s", animationDuration: 12 + i % 9 + "s"}}/>
    )}</div>
    <main id="main">
      <section id="home" className="hero-track"><div className="film-hero">
        <HeroArt/>
        <div className="film-copy"><small>Mumbai, India</small><h1>ABHIJEET</h1>
          <strong>Full-stack engineer</strong>
          <div><a className="pill lit" href="#projects">View projects</a><a className="pill" href="#contact">Get in touch</a></div>
        </div>
      </div></section>
      <div className="stats glass">{[[projects.length,"Featured projects"],[skillGroups.length,"Technical disciplines"],[services.length,"Services offered"]].map(([value,label]) =>
        <div key={label}><b><Count value={Number(value)}/></b><small>{label}</small></div>)}</div>
      <section id="projects" className="gallery-track"><div className="gallery-stage">
        <small className="gallery-label">Featured work</small>
        <Heading title="Projects"/>
        <div className="deck">{projects.map(project =>
          <details key={project.name} className="reference-project glass">
            <summary>
              <b className="card-number" aria-hidden="true">{project.number}</b>
              <svg className="project-trace" viewBox="0 0 116 64" aria-hidden="true">
                <path d={projectTraces[project.visual]} />
              </svg>
              <span>{project.name}</span>
              <small>{project.subtitle}</small>
            </summary>
            <p>{project.description}</p>
          </details>)}</div>
      </div></section>
      <section id="about" className="film-section biography"><Heading title="About me"/>
        <div className="profile-layout"><article className="glass bio"><p>I’m Abhijeet Gupta, a full-stack engineer in Mumbai building multi-tenant SaaS products at Omer Enterprises.</p>
          <p>I work across the whole application, from the first React screen to the database and deployment pipeline.</p>
          <h3>Technologies</h3><div className="chips">{["React","Next.js","Java","Spring Boot","PostgreSQL","Docker"].map(s => <span key={s}>{s}</span>)}</div>
          <a className="pill" href={siteConfig.resume} download><Download size={13}/> Download résumé</a>
        </article><figure className="hanging"><Image src={portrait} width={240} height={262} alt="" /><figcaption>Abhijeet Gupta<small>Full-stack engineer</small></figcaption></figure></div>
      </section>
      <section id="services" className="film-section narrow"><Heading title="Services & pricing"/>
        {services.map(([name, desc], i) => <details className="service glass" key={name}><summary><small>0{i+1}</small><strong>{name}</strong><span>By quote</span></summary><p>{desc} <a href="#contact">Request a quote →</a></p></details>)}
      </section>
      <section id="skills" className="film-section"><Heading title="Technical skills"/>
        <div className="skills-grid">{skillGroups.map(group => <article key={group.label} className="technical-row glass"><h3>{group.label}</h3><p>{group.items.join(" · ")}</p></article>)}</div>
        <Heading title="My tech stack"/><div className="stack">{stack.map(([name,Icon,color]) => <div className="glass" key={name}><Icon style={{color}}/><span>{name}</span></div>)}</div>
      </section>
      <section id="contact" className="film-section narrow"><Heading title="Contact"/>
        <div className="glass contact-box"><a href={`mailto:${siteConfig.email}`}><Mail size={17}/>{siteConfig.email}</a><ContactForm/></div>
      </section>
    </main>
    <footer><a href="#home">ABHIJEET.</a><span>Abhijeet Gupta · Mumbai</span><a href={siteConfig.resume} download>Résumé ↓</a></footer>
  </div>;
}
