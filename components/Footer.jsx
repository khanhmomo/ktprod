import Link from "next/link";
import { Hexagon, Globe, Mail, Rss } from "lucide-react";

const cols = [
  {
    title: "The Team",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/about#story", label: "Our Story" },
      { href: "/contact", label: "Say Hello" },
    ],
  },
  {
    title: "The Lab",
    links: [
      { href: "/#capabilities", label: "What We Do" },
      { href: "/#process", label: "How We Work" },
      { href: "/contact", label: "Collaborate" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "mailto:khanhtranproduction@gmail.com", label: "khanhtranproduction@gmail.com" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="tech-grid-dark">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-8 w-8 items-center justify-center">
                  <Hexagon className="h-8 w-8 text-crimson-500" strokeWidth={1.5} />
                  <span className="absolute font-mono text-[10px] font-bold text-crimson-500">K</span>
                </span>
                <span className="font-mono text-lg font-bold tracking-tight">
                  KT<span className="text-crimson-500">PROD</span>
                </span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
                An independent R&D team turning bright ideas into technology —
                software, hardware, and creative applications.
              </p>
              <div className="mt-6 flex gap-3">
                {[Globe, Mail, Rss].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="Social link"
                    className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/60 transition-colors hover:border-crimson-500 hover:text-crimson-500"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {cols.map((col) => (
              <div key={col.title}>
                <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-crimson-500">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-white/60 transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
            <p className="font-mono text-xs text-white/40">
              © {new Date().getFullYear()} KTPROD Technology. All rights reserved.
            </p>
            <p className="font-mono text-xs text-white/40">
              SYS.STATUS: <span className="text-crimson-400">ONLINE</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
