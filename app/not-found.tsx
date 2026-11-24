import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><p className="eyebrow">404 / ROUTE NOT FOUND</p><h1>This path doesn’t exist.</h1><p>The system is healthy. The URL is not.</p><Link className="button primary" href="/">Return home</Link></main>;
}
