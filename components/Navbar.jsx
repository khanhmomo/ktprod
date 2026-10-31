"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-ink/10 bg-white/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center">
          <span className="font-mono text-lg font-bold tracking-tight text-ink">
            KT<span className="text-crimson-700">PROD</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`link-underline font-mono text-sm uppercase tracking-widest transition-colors ${
                pathname === l.href ? "active text-crimson-700" : "text-ink/70 hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="border border-ink bg-ink px-5 py-2 font-mono text-sm uppercase tracking-widest text-white transition-colors hover:border-crimson-700 hover:bg-crimson-700"
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center text-ink md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-ink/10 bg-white md:hidden">
          <div className="flex flex-col px-4 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`border-b border-ink/5 py-4 font-mono text-sm uppercase tracking-widest ${
                  pathname === l.href ? "text-crimson-700" : "text-ink/70"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-4 bg-ink px-5 py-3 text-center font-mono text-sm uppercase tracking-widest text-white"
            >
              Get in touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
