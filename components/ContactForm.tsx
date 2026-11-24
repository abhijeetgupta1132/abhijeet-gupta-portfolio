"use client";

import { useState } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { siteConfig } from "@/data/portfolio";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); setState("error"); return; }
    setState("loading");
    const data = new FormData(form);
    const subject = encodeURIComponent(`Portfolio enquiry from ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\nFrom: ${data.get("name")} (${data.get("email")})`);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    window.setTimeout(() => setState("success"), 500);
  }
  return <form className="contact-form" onSubmit={submit} noValidate>
    <div className="field-row"><div className="field"><label htmlFor="name">Name</label><input id="name" name="name" autoComplete="name" required minLength={2} /></div><div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" autoCapitalize="none" spellCheck={false} required /></div></div>
    <div className="field"><label htmlFor="message">What would you like to build?</label><textarea id="message" name="message" rows={5} required minLength={10} /></div>
    <button className="button primary submit-button" type="submit" disabled={state === "loading"}>{state === "loading" ? <><LoaderCircle className="spin" />Preparing email</> : <>Start a conversation <ArrowUpRight /></>}</button>
    <p className={`form-status ${state}`} role="status" aria-live="polite">{state === "success" ? "Your email app is ready — review and send the message there." : state === "error" ? "Please complete each field with valid details." : "This form opens your email app; no information is stored."}</p>
  </form>;
}
