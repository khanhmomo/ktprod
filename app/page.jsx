import Link from "next/link";
import {
  ArrowRight,
  CircuitBoard,
  Camera,
  Users,
  Palette,
  FlaskConical,
  Code2,
  Terminal,
  ChevronRight,
} from "lucide-react";
import Reveal from "@/components/Reveal";

const stats = [
  { value: "3", label: "Founders" },
  { value: "3", label: "Disciplines — SW / HW / Creative" },
  { value: "1", label: "Photography Problem That Started It All" },
  { value: "∞", label: "Bright Ideas to Chase" },
];

const capabilities = [
  {
    icon: Code2,
    id: "CAP.01",
    title: "Software Engineering",
    desc: "Robust applications and innovative algorithms that translate complex challenges into elegant technical solutions.",
  },
  {
    icon: CircuitBoard,
    id: "CAP.02",
    title: "Hardware Design",
    desc: "Custom systems that bridge the physical and digital worlds — engineered to bring software concepts to life.",
  },
  {
    icon: Camera,
    id: "CAP.03",
    title: "Imaging & Photo Tech",
    desc: "Tools born from real sports-photography experience — capture, workflow, and delivery problems we know firsthand.",
  },
  {
    icon: Users,
    id: "CAP.04",
    title: "Event Technology",
    desc: "Solutions that help not just photographers, but everyone involved in bringing events to life.",
  },
  {
    icon: Palette,
    id: "CAP.05",
    title: "Creative Applications",
    desc: "Human-centered design that makes technology beautiful, intuitive, and worth using.",
  },
  {
    icon: FlaskConical,
    id: "CAP.06",
    title: "Rapid Prototyping",
    desc: "From bright idea to working prototype — we build to learn, then build to last.",
  },
];

const process = [
  {
    step: "01",
    title: "Spot the Problem",
    desc: "Every project starts with a real challenge — usually one we've lived through ourselves, out in the field.",
  },
  {
    step: "02",
    title: "Prototype",
    desc: "Rapid iteration on proof-of-concepts to see whether the idea actually holds up in practice.",
  },
  {
    step: "03",
    title: "Test in the Real World",
    desc: "We take our tools back to the events and workflows that inspired them and see if they genuinely help.",
  },
  {
    step: "04",
    title: "Refine & Share",
    desc: "Polish what works, learn from what doesn't, and put the solution into people's hands.",
  },
];

const marquee = [
  "SPORTS PHOTOGRAPHY",
  "EVENT TECHNOLOGY",
  "SOFTWARE ENGINEERING",
  "HARDWARE DESIGN",
  "IMAGING SYSTEMS",
  "CREATIVE TOOLS",
  "AUTOMATION",
  "BRIGHT IDEAS",
];

export default function Home() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="tech-grid relative overflow-hidden pt-16">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 70% 20%, rgba(143,20,32,0.08), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 sm:pt-28 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <Reveal>
                <p className="section-label flex items-center gap-2">
                  <span className="inline-block h-2 w-2 animate-pulse-dot bg-crimson-700" />
                  Independent R&D Team
                </p>
              </Reveal>
              <Reveal delay={100}>
                <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                  R&D for
                  <br />
                  every <span className="text-crimson-700">bright</span>
                  <br />
                  idea.
                </h1>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink/60">
                  We're a small R&D team that started in sports photography —
                  now we build software and hardware that turns creative
                  challenges into technology that benefits everyone.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="group flex items-center gap-2 bg-crimson-700 px-7 py-4 font-mono text-sm uppercase tracking-widest text-white transition-colors hover:bg-ink"
                  >
                    Share an idea
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center gap-2 border border-ink px-7 py-4 font-mono text-sm uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-white"
                  >
                    Our story
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Terminal card */}
            <Reveal delay={250} className="hidden lg:block">
              <div className="corner-brackets relative bg-ink p-1">
                <div className="tech-grid-dark relative overflow-hidden bg-ink-soft p-6">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                    <span className="h-3 w-3 rounded-full bg-crimson-600" />
                    <span className="h-3 w-3 rounded-full bg-white/20" />
                    <span className="h-3 w-3 rounded-full bg-white/20" />
                    <span className="ml-3 font-mono text-xs text-white/40">
                      ktprod://lab — session 0x2F
                    </span>
                  </div>
                  <div className="mt-4 space-y-3 font-mono text-sm">
                    <p className="text-white/40">
                      <span className="text-crimson-400">$</span> ktprod init --idea "bright-idea-001"
                    </p>
                    <p className="text-white/70">
                      ▸ Photographers' pain points... <span className="text-green-400">mapped</span>
                    </p>
                    <p className="text-white/70">
                      ▸ SW + HW feasibility... <span className="text-green-400">validated</span>
                    </p>
                    <p className="text-white/70">
                      ▸ Prototype rig... <span className="text-crimson-400">building</span>
                    </p>
                    <p className="text-white/40">
                      <span className="text-crimson-400">$</span> test --at next_event.sh
                    </p>
                    <p className="text-crimson-400">
                      █ ready for the next bright idea
                    </p>
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 h-16 animate-scan-line bg-gradient-to-b from-transparent via-crimson-500/5 to-transparent" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- MARQUEE ---------- */}
      <div className="overflow-hidden border-y border-ink/10 bg-white py-4">
        <div className="flex w-max animate-marquee gap-8">
          {[...marquee, ...marquee].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-8 whitespace-nowrap font-mono text-sm uppercase tracking-[0.3em] text-ink/40"
            >
              {item}
              <Terminal className="h-4 w-4 text-crimson-700" />
            </span>
          ))}
        </div>
      </div>

      {/* ---------- STATS ---------- */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-px bg-ink/10 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80} className="bg-white">
                <div className="p-8 text-center sm:p-10">
                  <p className="font-mono text-4xl font-bold text-crimson-700 sm:text-5xl">
                    {s.value}
                  </p>
                  <p className="mt-3 font-mono text-xs uppercase tracking-widest text-ink/50">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CAPABILITIES ---------- */}
      <section id="capabilities" className="bg-ink py-24 text-white">
        <div className="tech-grid-dark">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="section-label !text-crimson-500">// What We Do</p>
              <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
                Where our R&D lives
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((c, i) => (
                <Reveal key={c.id} delay={i * 60} className="bg-ink">
                  <div className="group h-full p-8 transition-colors hover:bg-ink-soft">
                    <div className="flex items-start justify-between">
                      <c.icon
                        className="h-8 w-8 text-crimson-500 transition-transform duration-300 group-hover:scale-110"
                        strokeWidth={1.5}
                      />
                      <span className="font-mono text-xs text-white/30">{c.id}</span>
                    </div>
                    <h3 className="mt-6 text-xl font-semibold">{c.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/50">{c.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PROCESS ---------- */}
      <section id="process" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="section-label">// How We Work</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              From bright idea to real tool
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 100}>
                <div className="group relative border-t-2 border-ink/10 pt-6 transition-colors hover:border-crimson-700">
                  <span className="font-mono text-5xl font-bold text-ink/10 transition-colors group-hover:text-crimson-700/20">
                    {p.step}
                  </span>
                  <h3 className="mt-4 flex items-center gap-2 text-lg font-semibold">
                    {p.title}
                    <ChevronRight className="h-4 w-4 text-crimson-700 opacity-0 transition-opacity group-hover:opacity-100" />
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="relative overflow-hidden bg-crimson-700 py-24 text-white">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 120%, rgba(0,0,0,0.4), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">
              // Ready when you are
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Got a bright idea? Bring it to the lab.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-white/70">
              Tell us about the problem. Our team loves figuring out whether —
              and how — it can be built.
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 bg-white px-8 py-4 font-mono text-sm uppercase tracking-widest text-crimson-700 transition-colors hover:bg-ink hover:text-white"
            >
              Contact the lab
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
