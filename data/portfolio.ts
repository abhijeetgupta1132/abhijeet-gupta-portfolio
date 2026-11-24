export const siteConfig = {
  name: "Abhijeet Gupta",
  role: "Full Stack Engineer",
  location: "Mumbai, India",
  email: "abhijeetgupta1132@gmail.com",
  github: "",
  linkedin: "",
  resume: "/Abhijeet_Gupta_Resume.pdf",
};

export const navItems = ["projects", "about", "services", "skills", "contact"] as const;

export const experience = [{
  role: "Full Stack Developer",
  company: "Omer Enterprises",
  period: "July 2026 — Present",
  summary: "Building and shipping production features for a multi-tenant SaaS platform.",
  bullets: [
    "Own features end to end across UI, server-side logic, database changes, API integration, testing, and release.",
    "Build with Next.js, React, PostgreSQL, Docker, and third-party integrations.",
    "Implement AI-assisted workflows and resolve production issues through debugging and validation.",
  ],
}];

export const projects = [
  {
    number: "01",
    name: "Task Manager",
    subtitle: "Secure Spring Boot REST API with JWT and RBAC",
    description: "A layered backend with 8+ secured endpoints, stateless authentication, BCrypt hashing, role-based authorization, validation, and documented API contracts.",
    technologies: ["Java", "Spring Boot", "Spring Security", "JPA", "JWT", "MySQL", "OpenAPI"],
    live: "",
    github: "",
    visual: "api",
  },
  {
    number: "02",
    name: "MindLog AI",
    subtitle: "AI-powered journaling and real-time analysis",
    description: "A deployed React and Express experience with Groq LLM integration, SSE streaming, response caching, rate limiting, Docker, and automated CI/CD.",
    technologies: ["React", "Node.js", "Express", "Groq API", "SSE", "Docker", "CI/CD"],
    live: "",
    github: "",
    visual: "stream",
  },
  {
    number: "03",
    name: "StockIQ",
    subtitle: "NSE stock analytics dashboard",
    description: "A five-stock ingestion pipeline and React dashboard calculating moving averages, yearly ranges, volatility, and Pearson correlation across five REST endpoints.",
    technologies: ["React", "Node.js", "Express", "SQLite", "Recharts", "REST APIs"],
    live: "",
    github: "",
    visual: "chart",
  },
] as const;

export const skillGroups = [
  { label: "Languages", items: ["Java", "JavaScript", "SQL"] },
  { label: "Frontend", items: ["Next.js", "React", "HTML", "CSS", "Recharts"] },
  { label: "Backend", items: ["Node.js", "Express.js", "Spring Boot", "Spring Security", "Spring Data JPA", "REST APIs", "JWT", "RBAC", "OpenAPI / Swagger"] },
  { label: "Data", items: ["PostgreSQL", "MySQL", "SQLite", "Hibernate / JPA"] },
  { label: "DevOps", items: ["Docker", "GitHub Actions", "CI/CD", "Git", "Maven", "Gradle", "Vercel", "Render"] },
  { label: "Quality & AI", items: ["Postman", "API Testing", "Integration Testing", "Manual QA", "Groq LLM API", "AI Integrations", "SSE Streaming"] },
];

export const approach = [
  ["01", "Understand", "Clarify the requirement, constraints, and success criteria."],
  ["02", "Design", "Map the workflow, boundaries, and data model."],
  ["03", "Build", "Connect a considered interface to reliable backend logic."],
  ["04", "Prove", "Test authentication, validation, failure paths, and edge cases."],
  ["05", "Improve", "Deploy, observe, debug, and strengthen the system."],
];
