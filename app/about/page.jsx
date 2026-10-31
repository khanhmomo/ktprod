import Link from "next/link";
import {
  ArrowRight,
  Target,
  Eye,
  Compass,
  Flame,
  Camera,
  Cpu,
  Hammer,
  Sparkles,
  Rocket,
  Code2,
  CircuitBoard,
  Palette,
  Aperture,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import FounderPhoto from "@/components/FounderPhoto";

export const metadata = {
  title: "About — KTProd Technology",
  description:
    "KTProd Technology is an R&D team dedicated to innovation — transforming bright ideas into technological solutions that benefit everyone.",
};

const values = [
  {
    icon: Target,
    title: "Mission",
    desc: "To empower innovation by transforming creative challenges into technological opportunities, making advanced solutions accessible to everyone.",
  },
  {
    icon: Eye,
    title: "Vision",
    desc: "To create technology that bridges the gap between creative passion and practical innovation, making advanced tools accessible to everyone.",
  },
  {
    icon: Compass,
    title: "Focus",
    desc: "Starting from sports photography, we focus on solving real-world challenges through technology that benefits all people.",
  },
  {
    icon: Flame,
    title: "Passion",
    desc: "Driven by our love for innovation and the desire to bring every bright idea to life, no matter how ambitious.",
  },
];

const journey = [
  {
    icon: Camera,
    step: "01",
    title: "Two Sports Photographers",
    desc: "We began as college students with cameras, capturing sports events and discovering the challenges photographers face daily.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "Technology Meets Photography",
    desc: "Realized that technology could solve many photography challenges — not just for photographers, but for everyone involved in events.",
  },
  {
    icon: Hammer,
    step: "03",
    title: "Building Solutions",
    desc: "Started developing practical technology solutions, transforming our photography experience into innovative tools for broader applications.",
  },
  {
    icon: Sparkles,
    step: "04",
    title: "Bringing Ideas to Life",
    desc: "Dedicated to transforming every bright idea into reality, with passion for innovation that benefits all people.",
  },
  {
    icon: Rocket,
    step: "05",
    title: "Innovation Continues",
    desc: "Our journey continues as we push boundaries, explore new possibilities, and keep bringing creative ideas to life with technology that makes a difference.",
  },
];

const founders = [
  {
    icon: Code2,
    initials: "KT",
    photo: "/founders/khanh-tran.webp",
    name: "Khanh Tran (Mo)",
    role: "Software Lead",
    desc: "Software-focused engineer with expertise in developing robust applications and innovative algorithms. Translates complex challenges into elegant technical solutions that power our creative visions.",
  },
  {
    icon: CircuitBoard,
    initials: "ND",
    photo: "/founders/nam-dao.webp",
    name: "Nam Dao",
    role: "Hardware Lead",
    desc: "Hardware specialist who bridges the physical and digital worlds. Designs and builds custom systems that bring software concepts to life through innovative engineering and practical solutions.",
  },
  {
    icon: Palette,
    initials: "MT",
    photo: "/founders/minh-tran.webp",
    name: "Minh Tran",
    role: "Creative Lead",
    desc: "Creative visionary who brings artistic perspective to technology innovation. Ensures our solutions are not just functional but beautiful, intuitive, and focused on human-centered design experiences.",
  },
  {
    icon: Aperture,
    initials: "HN",
    photo: "/founders/hung-nguyen.jpg",
    name: "Hung Nguyen",
    role: "Visual Developer",
    desc: "Visual developer who turns ideas and designs into polished, working interfaces. Blends an eye for imagery with hands-on engineering to make every product look and feel right.",
  },
];

export default function About() {
  return (
    <>
      {/* ---------- PAGE HEADER ---------- */}
      <section className="tech-grid relative pt-16">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:px-8">
          <Reveal>
            <p className="section-label">// About KTProd</p>
            <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              R&D for every{" "}
              <span className="text-crimson-700">bright idea</span>.
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/60">
              We're an R&D team dedicated to innovation — transforming bright
              ideas into technological solutions that benefit everyone.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- CORE VALUES ---------- */}
      <section className="bg-white pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="section-label">// Core Values</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              The principles that guide us
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="corner-brackets h-full border border-ink/10 p-8">
                  <v.icon className="h-8 w-8 text-crimson-700" strokeWidth={1.5} />
                  <h3 className="mt-6 text-xl font-semibold">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- OUR STORY ---------- */}
      <section id="story" className="bg-ink py-24 text-white">
        <div className="tech-grid-dark">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
              <Reveal>
                <p className="section-label !text-crimson-500">// Our Story</p>
                <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                  From behind the lens to behind the tech.
                </h2>
              </Reveal>
              <Reveal delay={150}>
                <div className="space-y-6 text-lg leading-relaxed text-white/60">
                  <p>
                    We are a passionate R&D team that loves bringing innovative
                    ideas to life. Our focus is on bridging the gap between
                    creative concepts and practical technology solutions.
                  </p>
                  <p>
                    We combine expertise in{" "}
                    <span className="text-white">software engineering</span>,{" "}
                    <span className="text-white">hardware design</span>, and{" "}
                    <span className="text-white">creative applications</span> to
                    solve complex challenges — transforming bright ideas into
                    real-world solutions that make a meaningful impact across
                    various domains and industries.
                  </p>
                  <p className="border-l-2 border-crimson-500 pl-6 font-mono text-sm uppercase tracking-widest text-crimson-400">
                    Software + Hardware + Creativity
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- JOURNEY ---------- */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="section-label">// Our Journey</p>
            <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              Key milestones along the way
            </h2>
          </Reveal>
          <div className="mt-14 space-y-0">
            {journey.map((j, i) => (
              <Reveal key={j.step} delay={i * 60}>
                <div className="group flex flex-col gap-4 border-b border-ink/10 py-8 sm:flex-row sm:items-center sm:gap-10">
                  <div className="flex w-full shrink-0 items-center gap-4 sm:w-auto">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-ink/15 text-ink/40 transition-colors group-hover:border-crimson-700 group-hover:text-crimson-700">
                      <j.icon className="h-6 w-6" strokeWidth={1.5} />
                    </span>
                    <span className="font-mono text-sm text-ink/30">
                      {j.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold transition-transform group-hover:translate-x-2">
                      {j.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/60">
                      {j.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FOUNDERS ---------- */}
      <section className="bg-ink py-24 text-white">
        <div className="tech-grid-dark">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <Reveal>
              <p className="section-label !text-crimson-500">
                // Meet the Founders
              </p>
              <h2 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
                The innovators behind the lab
              </h2>
              <p className="mt-4 max-w-2xl text-white/50">
                Combining software, hardware, and creative expertise to
                transform ideas into reality.
              </p>
            </Reveal>
            <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {founders.map((f, i) => (
                <Reveal key={f.name} delay={i * 100} className="bg-ink">
                  <div className="group h-full p-8 transition-colors hover:bg-ink-soft">
                    <div className="flex items-center justify-between">
                      <FounderPhoto
                        src={f.photo}
                        initials={f.initials}
                        name={f.name}
                      />
                      <f.icon
                        className="h-7 w-7 text-crimson-500/60 transition-colors group-hover:text-crimson-500"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold">{f.name}</h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-widest text-crimson-500">
                      {f.role}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-white/50">
                      {f.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
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
              // Join our innovation journey
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Whether you're a photographer, event organizer, or tech enthusiast
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-white/70">
              Explore how our solutions can transform your photography workflow
              — or bring us your own bright idea.
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 bg-white px-8 py-4 font-mono text-sm uppercase tracking-widest text-crimson-700 transition-colors hover:bg-ink hover:text-white"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
