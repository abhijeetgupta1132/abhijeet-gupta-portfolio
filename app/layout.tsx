import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/MotionProvider";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://abhijeet-gupta.dev"),
  title: { default: "Abhijeet Gupta — Full Stack Engineer", template: "%s — Abhijeet Gupta" },
  description: "Full Stack Engineer building reliable multi-tenant SaaS products with Next.js, React, Node.js, Java, Spring Boot, PostgreSQL, and Docker.",
  keywords: ["Abhijeet Gupta", "Full Stack Engineer", "Next.js Developer", "React Developer", "Spring Boot Developer", "Mumbai"],
  authors: [{ name: "Abhijeet Gupta" }],
  openGraph: {
    title: "Abhijeet Gupta — Full Stack Engineer",
    description: "Reliable SaaS products, from interface to deployment.",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Abhijeet Gupta, Full Stack Engineer" }],
  },
  twitter: { card: "summary_large_image", title: "Abhijeet Gupta — Full Stack Engineer", description: "Reliable SaaS products, from interface to deployment.", images: ["/opengraph-image"] },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#090b0e", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${sans.variable} ${mono.variable}`}><body><MotionProvider>{children}</MotionProvider></body></html>;
}
