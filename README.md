# Abhijeet Gupta — Portfolio

A production-ready Next.js portfolio presenting Abhijeet as a Full Stack Engineer with professional SaaS experience.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. For a production check:

```bash
npm run lint
npm run typecheck
npm run build
```

## Customize

All portfolio content, projects, experience, skills, resume path, and social links live in `data/portfolio.ts`. Empty social and project URLs render as clearly disabled placeholders and never create fake links.

Replace `public/Abhijeet_Gupta_Resume.pdf` whenever the resume changes. Update `metadataBase` in `app/layout.tsx` to the final production domain before deployment.

## Contact form

The contact form uses accessible native constraints and a safe `mailto:` fallback, so no message is transmitted or stored by this site. To connect a service such as Resend:

1. Add the service key to `.env.local` using `.env.example`.
2. Create a server-only route or Server Action.
3. Validate and rate-limit requests on the server.
4. Replace the `mailto:` branch in `components/ContactForm.tsx` with a POST request and preserve the existing loading, success, and error states.

## Deploy

The app can be imported directly into Vercel or deployed anywhere that supports Node.js and Next.js. Run `npm run build` before release.

## Crimson reference theme

The selected direction preserves the reference video's framed hero, diagonal glass and portrait. The palette is near-black, warm white and crimson. Geist remains the interface font. Hero content is limited to the name, job title and two actions; existing project and service facts are preserved.

Motion starts automatically: glass drift, smoke, embers and desktop pointer depth. Native scroll timelines enhance the desktop glass split where supported; the page remains usable without them. Project details always open at full size. On portrait screens the photo sits in front of the glass to keep the face unobstructed. A reduced-motion system preference slows ambient effects and removes pointer movement. The requested always-on motion has no pause button, so this is not a claim of full WCAG motion compliance.

Generated asset: `public/crimson-smoke.webp` (50,752 bytes), made with the built-in image-generation tool. Prompt: cinematic crimson wispy smoke on near-black, detail concentrated at the right and bottom with calm space on the left; no people, text, UI or borders. The existing portrait asset is retained. The source before this theme is backed up in `G:\messenger\portfolio-before-crimson-20261125.zip`.

Design passes used Taste for spacing and visual checks, Modern Web Guidance for compositor-friendly motion, and Unslop by [Damir Sokolovsky](https://heydamir.design/unslop) (CC BY 4.0) for hierarchy and restrained surfaces. The user's selected reference overrides those skills' default prohibitions on glass, uppercase type and continuous motion. Webapp Testing informed `tests/crimson_qa.py`; run it with Python Playwright against the dev server (or set `PORTFOLIO_URL`).

Validation: build, lint, visual QA, motion QA, and the seven-viewport crimson regression suite passed. The Taste gate reported `FAIL` (32 findings before the final contrast adjustment), primarily against its prescribed section heights, container markup, hero copy, sticky positioning, captions and button recipes. Those defaults are not claimed as passed; the approved reference composition takes precedence. The actionable contact-note contrast issue was corrected. Its hidden focus finding targets the Next.js development overlay, not a production page control.
