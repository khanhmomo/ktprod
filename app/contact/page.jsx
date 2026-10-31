"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/Reveal";

const channels = [
  {
    icon: Mail,
    title: "Email",
    value: "khanhtranproduction@gmail.com",
    href: "mailto:khanhtranproduction@gmail.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (361) 218-1470",
    href: "tel:+13612181470",
  },
  {
    icon: MapPin,
    title: "Lab HQ",
    value: "Houston, Texas 77072",
    href: "#",
  },
];

const inputCls =
  "w-full border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/30 focus:border-crimson-700";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      {/* ---------- PAGE HEADER ---------- */}
      <section className="tech-grid pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pt-28 lg:px-8">
          <Reveal>
            <p className="section-label">// Contact</p>
            <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Start the <span className="text-crimson-700">conversation</span>.
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/60">
              Describe your problem, your idea, or your wildest what-if. We're a
              small team, but we read everything — and we actually reply.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- CONTENT ---------- */}
      <section className="bg-white pb-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
          {/* Info column */}
          <div>
            <Reveal>
              <div className="space-y-px bg-ink/10">
                {channels.map((c) => (
                  <a
                    key={c.title}
                    href={c.href}
                    className="group flex items-center gap-5 bg-white p-6 transition-colors hover:bg-ink/[0.02]"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-crimson-700/30 text-crimson-700 transition-colors group-hover:bg-crimson-700 group-hover:text-white">
                      <c.icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <span>
                      <span className="block font-mono text-xs uppercase tracking-widest text-ink/40">
                        {c.title}
                      </span>
                      <span className="mt-1 block font-medium text-ink">
                        {c.value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="corner-brackets mt-8 bg-ink p-8 text-white">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-crimson-500">
                  // Response protocol
                </p>
                <ul className="mt-5 space-y-3 text-sm text-white/60">
                  <li className="flex gap-3">
                    <span className="font-mono text-crimson-400">01</span>
                    A founder reads every message
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-crimson-400">02</span>
                    Honest take on whether we can help
                  </li>
                  <li className="flex gap-3">
                    <span className="font-mono text-crimson-400">03</span>
                    If there's a fit, we figure out next steps together
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Form column */}
          <Reveal delay={100}>
            {sent ? (
              <div className="flex h-full min-h-[400px] flex-col items-center justify-center border border-ink/10 p-12 text-center">
                <CheckCircle2 className="h-14 w-14 text-crimson-700" strokeWidth={1.5} />
                <h2 className="mt-6 text-2xl font-bold">Transmission received.</h2>
                <p className="mt-3 max-w-sm text-ink/60">
                  Thanks for reaching out. One of us will get back to you —
                  usually within a couple of days.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-8 font-mono text-sm uppercase tracking-widest text-crimson-700 link-underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="corner-brackets border border-ink/10 p-8 sm:p-10"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-ink/50">
                      Name *
                    </label>
                    <input required placeholder="Jane Doe" className={inputCls} />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-ink/50">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="jane@company.com"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-ink/50">
                      Organization
                    </label>
                    <input placeholder="Optional" className={inputCls} />
                  </div>
                  <div>
                    <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-ink/50">
                      Interest
                    </label>
                    <select className={inputCls} defaultValue="">
                      <option value="" disabled>
                        Select a domain
                      </option>
                      <option>Sports / Event Photography</option>
                      <option>Software Engineering</option>
                      <option>Hardware Design</option>
                      <option>Creative Tools</option>
                      <option>Collaboration</option>
                      <option>Other / Not sure yet</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-ink/50">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={6}
                      placeholder="Tell us about the problem you're trying to solve..."
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="group mt-8 flex w-full items-center justify-center gap-2 bg-crimson-700 px-8 py-4 font-mono text-sm uppercase tracking-widest text-white transition-colors hover:bg-ink sm:w-auto"
                >
                  Transmit message
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
