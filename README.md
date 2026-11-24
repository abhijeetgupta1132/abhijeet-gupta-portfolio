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
