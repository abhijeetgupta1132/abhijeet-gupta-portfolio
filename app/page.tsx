import Image from "next/image";
import { Atom, Braces, Coffee, Database, Boxes, GitBranch, Server, Mail, Download } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { ContactForm } from "@/components/ContactForm";
import { FilmHero } from "@/components/FilmHero";
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

const projectTraces = {
  api: "M4 32H28M28 32C50 32 40 10 62 10H110M28 32H110M28 32C50 32 40 54 62 54H110",
  stream: "M3 32H18L22 24L27 41L34 9L42 54L49 22L55 39L62 13L70 47L77 26L83 37L89 30H111",
  chart: "M3 53L16 44L28 48L42 30L51 36L66 19L77 28L92 11L100 16L112 5"
};

export default function Home() {
  return <div className="film film-on">
    <Navigation/>
    <div className="atmosphere" aria-hidden="true">{Array.from({length: 24}, (_, i) =>
      <i key={i} style={{left: (i * 41 % 101) + "%", top: (i * 63 % 103) + "%", animationDelay: -i * 1.41 + "s", animationDuration: 12 + i % 9 + "s"}}/>
    )}</div>
    <main id="main">
      <FilmHero/>
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
              <span className="project-expand">Project details <b aria-hidden="true">+</b></span>
            </summary>
            <p>{project.description}</p>
            <div className="project-technologies">{project.technologies.map(technology => <span key={technology}>{technology}</span>)}</div>
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
