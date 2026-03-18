import {
  ArrowRight,
  BookOpenText,
  BriefcaseBusiness,
  Camera,
  GraduationCap,
  Palette,
  Sparkles,
  Trophy,
  Wrench,
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import LandingScrollLink from "../components/LandingScrollLink";
import ProjectCard from "../components/ProjectCard";
import RevealSection from "../components/RevealSection";
import SectionHeading from "../components/SectionHeading";
import {
  achievementItems,
  bookItems,
  contactCards,
  designItems,
  educationItems,
  heroHighlights,
  photographyItems,
  portrait,
  projectLinks,
  workItems,
} from "../data/siteData";

const categoryCards = [
  {
    title: "Books",
    icon: BookOpenText,
    description: "Reading that sharpens design thinking, clarity, and creative discipline.",
    items: bookItems,
  },
  {
    title: "Graphic Designs",
    icon: Palette,
    description: "Poster, social, and brand explorations built with stronger hierarchy.",
    items: designItems,
  },
  {
    title: "Photographs",
    icon: Camera,
    description: "Portraits, framing, and atmosphere that influence the visual rhythm.",
    items: photographyItems,
  },
  {
    title: "Achievements",
    icon: Trophy,
    description: "Visible progress through shipped work and continuous portfolio growth.",
    items: achievementItems,
  },
];

const practiceCards = [
  {
    title: "Software Projects",
    icon: Wrench,
    text: "Live web tools presented as polished mini-products with a cleaner UI language.",
  },
  {
    title: "Working Experience",
    icon: BriefcaseBusiness,
    text: "Real project exposure that shaped presentation quality, speed, and practical output.",
  },
  {
    title: "Education",
    icon: GraduationCap,
    text: "Learning foundations that support both technical structure and creative confidence.",
  },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 110]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -70]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -26]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 22]);

  return (
    <main className="page-frame pb-16 pt-4 md:pb-24 md:pt-6">
      <section id="home" ref={heroRef} className="section-anchor hero-shell overflow-hidden px-5 py-6 md:px-8 md:py-8 xl:px-10">
        <div className="grid gap-14 xl:grid-cols-[1.04fr_0.96fr] xl:items-end">
          <motion.div
            style={{ y: copyY }}
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[760px]"
          >
            <div className="eyebrow-pill">
              <span className="h-2.5 w-2.5 rounded-full bg-gold" />
              Creative developer building premium digital experiences
            </div>
            <h1 className="hero-title mt-7 text-ink">
              Modern portfolio design for polished products, clean visuals, and useful web tools.
            </h1>
            <p className="mt-6 max-w-[640px] text-[17px] leading-8 text-zinc-600 md:text-[18px]">
              Inspired by premium Framer portfolio templates, this landing page brings together
              software projects, working experience, education, books, graphic designs,
              photographs, and achievements in one elegant flow.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <LandingScrollLink href="/#projects" className="primary-action">
                Selected Work
              </LandingScrollLink>
              <LandingScrollLink href="/#about" className="secondary-action">
                About Me
              </LandingScrollLink>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {heroHighlights.map((item) => (
                <div key={item} className="mini-info-card">
                  <span className="mini-info-dot" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 40 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto flex w-full max-w-[720px] items-end justify-center"
          >
            <motion.div style={{ y: glowY }} className="hero-blur hero-blur-left" />
            <motion.div style={{ y: orbY }} className="hero-blur hero-blur-right" />
            <motion.div style={{ y: glowY }} className="hero-sheet hero-sheet-back" />
            <motion.div style={{ y: orbY }} className="hero-sheet hero-sheet-front" />

            <motion.div style={{ y: portraitY }} className="portrait-stage">
              <div className="portrait-caption top-6 left-6">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Featured Profile
                </span>
                <p className="mt-3 text-sm leading-7 text-zinc-600">
                  UI-focused frontend work with a taste for spacing, clarity, and visual calm.
                </p>
              </div>
              <div className="portrait-caption bottom-6 right-6 max-w-[220px]">
                <span className="section-chip">2026 Portfolio</span>
                <p className="mt-3 text-sm leading-7 text-zinc-600">
                  A cleaner image treatment with subtle depth instead of aggressive 3D tilt.
                </p>
              </div>
              <img
                src={portrait}
                alt="Adheesha Sooriyaarachchi portrait"
                className="relative z-10 h-full max-h-[760px] w-auto object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <RevealSection id="projects" className="section-anchor mt-24">
        <SectionHeading
          label="Selected Work"
          title="Software projects presented with a cleaner editorial product feel."
          text="The Framer reference has a strong project-first rhythm, so this portfolio now surfaces the work in larger, image-led cards instead of plain utility blocks."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projectLinks.map((project, index) => (
            <ProjectCard key={project.name} project={project} featured={index === 0} />
          ))}
        </div>
      </RevealSection>

      <RevealSection id="about" className="section-anchor mt-24" delay={0.04}>
        <div className="grid gap-10 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
          <div className="max-w-[620px]">
            <SectionHeading
              label="About Me"
              title="A portfolio that balances interface quality, practical tools, and a wider creative eye."
              text="My direction sits between polished frontend execution and visual storytelling. I like clean structure, deliberate motion, and interfaces that feel considered from the first glance."
            />
            <div className="mt-8 space-y-4">
              {practiceCards.map((item) => (
                <article key={item.title} className="editorial-card flex gap-4 p-5">
                  <item.icon className="mt-1 h-5 w-5 text-gold" />
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.04em] text-ink">{item.title}</h3>
                    <p className="mt-2 text-[15px] leading-7 text-zinc-600">{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            {workItems.map((item) => (
              <article key={item.name} className="editorial-card p-6">
                <div className="flex items-start justify-between gap-4">
                  <img src={item.image} alt={`${item.name} logo`} className="h-16 w-16 object-contain" />
                  <span className="section-chip">{item.period}</span>
                </div>
                <h3 className="mt-6 text-[2rem] font-semibold tracking-[-0.05em] text-ink">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  {item.role}
                </p>
                <p className="mt-4 text-[15px] leading-7 text-zinc-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="mt-24" delay={0.08}>
        <SectionHeading
          label="Education"
          title="Learning foundations that support both technical confidence and creative growth."
          text="Education stays visible as part of the portfolio story rather than hidden under a separate page."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {educationItems.map((item) => (
            <article key={item.name} className="editorial-card flex min-h-[220px] flex-col justify-between p-6">
              <img src={item.image} alt={`${item.name} logo`} className="h-20 w-full object-contain" />
              <div className="pt-8">
                <h3 className="text-[1.6rem] font-semibold tracking-[-0.04em] text-ink">{item.name}</h3>
                <p className="mt-3 text-[15px] leading-7 text-zinc-600">{item.focus}</p>
              </div>
            </article>
          ))}
        </div>
      </RevealSection>

      <RevealSection className="mt-24" delay={0.12}>
        <SectionHeading
          label="Creative Collections"
          title="Books, design explorations, photographs, and achievements in the same premium system."
          text="The portfolio stays broad, but every category follows the same calm visual language and spacing rules."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {categoryCards.map((collection) => (
            <article key={collection.title} className="editorial-card flex h-full flex-col p-6">
              <div className="flex items-center justify-between gap-4">
                <collection.icon className="h-5 w-5 text-gold" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Portfolio Layer
                </span>
              </div>
              <h3 className="mt-6 text-[2rem] font-semibold tracking-[-0.05em] text-ink">
                {collection.title}
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-zinc-600">{collection.description}</p>
              <div className="mt-6 space-y-3">
                {collection.items.map((item) => (
                  <div key={item.title} className="subtle-stack-card px-4 py-4">
                    <p className="text-sm font-semibold text-ink">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">{item.note}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </RevealSection>

      <RevealSection id="contact" className="section-anchor mt-24" delay={0.16}>
        <section className="contact-shell overflow-hidden px-6 py-8 md:px-8 md:py-10 xl:px-10">
          <div className="grid gap-10 xl:grid-cols-[1fr_0.9fr] xl:items-end">
            <div className="max-w-[720px]">
              <span className="section-chip">Contact</span>
              <h2 className="subheadline-balance mt-6 font-semibold text-ink">
                Building portfolio websites, premium landing pages, and useful digital tools.
              </h2>
              <p className="mt-5 max-w-[620px] text-[17px] leading-8 text-zinc-600">
                If you want a cleaner presentation, stronger frontend polish, or a more
                premium portfolio direction like this, let&apos;s build it properly.
              </p>
              <div className="mt-8">
                <LandingScrollLink href="/#home" className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
                  Back to top <ArrowRight className="h-4 w-4" />
                </LandingScrollLink>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              {contactCards.map((item) => (
                <article key={item.title} className="subtle-stack-card px-5 py-5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    {item.title}
                  </span>
                  <p className="mt-3 text-base font-semibold leading-7 text-ink">{item.value}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>
    </main>
  );
}
