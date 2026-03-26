"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Coffee, Facebook, Github, Instagram, Linkedin, Sparkles, WandSparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  achievementItems,
  bookshelfItems,
  contactContent,
  certificateItems,
  educationItems,
  experienceItems,
  galleryItems,
  heroContent,
  navItems,
  socialLinks,
  softwareProjects,
  toolkitGroups,
} from "../lib/site-data";

const easeOutQuint = (value) => 1 - Math.pow(1 - value, 5);
const socialIconMap = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
};

function smoothScrollTo(id) {
  if (typeof window === "undefined") return;
  const element = document.getElementById(id);
  if (!element) return;

  const offset = 92;
  const start = window.scrollY;
  const target = element.getBoundingClientRect().top + window.scrollY - offset;
  const distance = target - start;
  const duration = 1050;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutQuint(progress);
    window.scrollTo(0, start + distance * eased);
    if (progress < 1) window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
}

function SectionIntro({ eyebrow, title, text, align = "left", theme = "light" }) {
  const dark = theme === "dark";

  return (
    <div className={`relative z-10 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] ${dark ? "bg-white/10 text-gold" : "bg-white/55 text-gold glass-soft"}`}>
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </span>
      <h2 className={`font-display text-balance mt-5 text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[0.92] tracking-[-0.08em] ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      <p className={`mt-4 max-w-xl text-[14px] leading-7 md:text-[15px] ${dark ? "text-zinc-300" : "text-zinc-600"}`}>
        {text}
      </p>
    </div>
  );
}

function SectionReveal({ children, className = "", delay = 0, id }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function RoleRoller({ roles, reduceMotion }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || roles.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % roles.length);
    }, 2200);

    return () => window.clearInterval(timer);
  }, [reduceMotion, roles]);

  return (
    <div className="mt-5 flex items-start gap-5">
      <span className="mt-4 hidden h-px w-12 bg-gold/60 md:block" />
      <div className="relative h-[5.25rem] overflow-hidden md:h-[6.25rem]">
        <AnimatePresence mode="wait">
          <motion.p
            key={roles[activeIndex].join("-")}
            initial={reduceMotion ? { opacity: 1 } : { y: 42, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { y: -42, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-balance text-[clamp(1.42rem,2.7vw,2.35rem)] font-semibold leading-[1.14] tracking-[-0.06em] text-zinc-700"
          >
                        {roles[activeIndex].map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
function ToolkitOverviewCard({ group, index }) {
  return (
    <motion.a
      href={`/tools#${group.id}`}
      className="group relative overflow-hidden rounded-[28px] p-5 md:p-6"
      style={{
        backgroundImage: `linear-gradient(165deg, rgba(255,255,255,0.82), rgba(255,255,255,0.58)), ${group.accent}`,
        boxShadow: `0 20px 44px ${group.glow}`,
      }}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.75, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
    >
      <div className="noise-mask opacity-35" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex rounded-full bg-white/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600 glass-soft">
            {group.eyebrow}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            {group.items.length} Tools
          </span>
        </div>

        <h3 className="font-display mt-5 text-[1.55rem] font-semibold tracking-[-0.06em] text-ink md:text-[1.75rem]">
          {group.title}
        </h3>
        <p className="mt-3 max-w-md text-[14px] leading-7 text-zinc-600">
          {group.description}
        </p>

        <div className="mt-6 flex items-center justify-between gap-3 rounded-[20px] bg-white/55 px-4 py-3 glass-soft">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Category Access
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-700">
              Open the full tools page for everything in this group.
            </p>
          </div>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-zinc-500 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.a>
  );
}

function ProjectCard({ project, index }) {
  const isAnchor = project.href.startsWith("#");
  const isExternal = !isAnchor;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.8, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden rounded-[22px] glass-panel p-3 md:p-3.5"
    >
      <div className="noise-mask" />
      <div className="absolute inset-0" style={{ background: project.accent }} />
      <div
        className="absolute inset-x-5 top-5 h-20 rounded-[20px] opacity-90 blur-3xl"
        style={{ background: project.glow }}
      />
      <div className="absolute inset-[1px] rounded-[24px] bg-white/74" />
      <div className="relative z-10 flex h-full flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500">{project.type}</p>
            <p className="mt-1.5 inline-flex rounded-full bg-white/75 px-2.5 py-1 text-[10px] font-semibold text-zinc-700 glass-soft">
              {project.status}
            </p>
          </div>
          <div className="font-display text-[1.35rem] font-semibold tracking-[-0.08em] text-zinc-200 transition-transform duration-500 group-hover:scale-105 md:text-[1.7rem]">
            {project.name.slice(0, 2).toUpperCase()}
          </div>
        </div>
        {project.image ? (
          isAnchor ? null : (
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="group/image relative block overflow-hidden rounded-[18px] border border-white/45 bg-white/70"
              aria-label={`Open ${project.name}`}
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={project.image}
                  alt={project.imageAlt || project.name}
                  fill
                  sizes="(min-width: 1536px) 18vw, (min-width: 1280px) 22vw, (min-width: 768px) 40vw, 92vw"
                  className="object-cover transition duration-500 group-hover/image:scale-[1.03]"
                />
              </div>
            </a>
          )
        ) : null}

        <div>
          <h3 className="font-display text-[1.2rem] font-semibold tracking-[-0.07em] text-ink md:text-[1.35rem]">
            {project.name}
          </h3>
          <p className="mt-1.5 max-w-xl text-[11px] leading-[1.45rem] text-zinc-600 md:text-[12px]">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.details.map((detail) => (
            <span key={detail} className="rounded-full bg-white/72 px-2 py-1 text-[9px] font-medium text-zinc-700 glass-soft">
              {detail}
            </span>
          ))}
        </div>

        {isAnchor ? (
          <button
            type="button"
            onClick={() => smoothScrollTo(project.href.replace("#", ""))}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-3.5 py-2 text-[12px] font-semibold text-white shadow-lg shadow-black/10"
          >
            {project.cta}
            <ArrowUpRight className="h-4 w-4" />
          </button>
        ) : (
          <a
            href={project.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
            className="inline-flex w-fit items-center gap-2 rounded-full bg-ink px-3.5 py-2 text-[12px] font-semibold text-white shadow-lg shadow-black/10"
          >
            {project.cta}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </motion.article>
  );
}

function GalleryCard({ item, index, onOpen }) {
  const hasImage = Boolean(item.image);

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(item)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className={`group relative mb-5 w-full overflow-hidden rounded-[28px] text-left ${item.height}`}
      style={hasImage ? undefined : { background: item.accent }}
    >
      {hasImage ? (
        <>
          <Image
            src={item.image}
            alt={item.imageAlt || item.title}
            fill
            sizes="(min-width: 1536px) 24vw, (min-width: 1280px) 28vw, (min-width: 768px) 42vw, 92vw"
            className="object-contain bg-white/92 p-3 transition duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-black/8" />
        </>
      ) : (
        <div className="noise-mask opacity-20" />
      )}
      <div className={`absolute inset-4 rounded-[22px] border ${hasImage ? "border-white/20" : "border-white/40"}`} />
      <div className={`absolute -right-8 top-6 h-24 w-24 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-125 ${hasImage ? "bg-white/20" : "bg-white/45"}`} />
      <div className="relative z-10 flex h-full flex-col justify-between p-4">
        <span className={`w-fit rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${hasImage ? "bg-black/30 text-white backdrop-blur-md" : "bg-white/70 text-zinc-700 glass-soft"}`}>
          {item.category}
        </span>
        <div>
          <h3 className={`font-display text-2xl font-semibold tracking-[-0.06em] ${hasImage ? "text-white" : "text-ink"}`}>{item.title}</h3>
          <p className={`mt-2 max-w-sm text-sm leading-7 ${hasImage ? "text-white/82" : "text-zinc-700/80"}`}>{item.description}</p>
        </div>
      </div>
    </motion.button>
  );
}

function CertificateCard({ item, index, onOpen }) {
  const isPortrait = item.orientation === "portrait";

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(item)}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.82, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10, rotateX: 4, rotateY: index % 2 === 0 ? -4 : 4 }}
      className={`group relative mx-auto w-full overflow-hidden rounded-[26px] p-2.5 text-left [transform-style:preserve-3d] md:p-3 ${isPortrait ? "max-w-[220px]" : "max-w-[320px]"}`}
      style={{ background: item.accent, boxShadow: `0 22px 56px ${item.glow}` }}
    >
      <div className="noise-mask opacity-20" />
      <div className="absolute inset-[1px] rounded-[27px] bg-white/72" />
      <div className="absolute -right-8 top-6 h-20 w-20 rounded-full bg-white/45 blur-3xl transition duration-500 group-hover:scale-125" />
      <div className="absolute left-4 top-4 h-14 w-14 rounded-3xl bg-white/35 blur-2xl" />
      <div className="relative z-10">
        <div className={`relative overflow-hidden rounded-[20px] bg-white/65 p-1.5 shadow-[0_22px_38px_rgba(15,23,42,0.12)] [transform:translateZ(36px)] ${isPortrait ? "mx-auto max-w-[220px]" : ""}`}>
          <div className={`relative overflow-hidden rounded-[16px] bg-white ${isPortrait ? "aspect-[0.76/1]" : "aspect-[1.5/1]"}`}>
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(min-width: 1536px) 18vw, (min-width: 1280px) 20vw, (min-width: 768px) 28vw, 46vw"
              className="object-contain object-center bg-white p-1 transition duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </div>
        <div className="mt-3 [transform:translateZ(22px)]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">{item.label}</p>
          <h3 className="font-display mt-1.5 text-[1rem] font-semibold tracking-[-0.06em] text-ink md:text-[1.1rem]">{item.title}</h3>
          <p className="mt-1.5 text-[11px] leading-5 text-zinc-600 md:text-[12px]">{item.description}</p>
        </div>
      </div>
    </motion.button>
  );
}

function JourneyCard({ item, index, onOpen, label }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen({ ...item, label })}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.75, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-[26px] bg-white/62 p-4 text-left glass-soft transition duration-300 md:p-4.5"
    >
      <div className="noise-mask opacity-20" />
      <div className="relative z-10 rounded-[22px] bg-white/72 p-4">
        <div className="mx-auto flex aspect-square w-full max-w-[170px] items-center justify-center rounded-[24px] bg-white shadow-[0_16px_32px_rgba(15,23,42,0.08)] md:max-w-[190px]">
          {item.image ? (
            <Image src={item.image} alt={item.title} className={`h-20 w-20 object-contain md:h-24 md:w-24 ${item.imageClassName || ""}`.trim()} />
          ) : null}
        </div>
        <div className="mt-4 min-w-0">
          <h3 className="font-display text-[1.2rem] font-semibold tracking-[-0.06em] text-ink md:text-[1.35rem]">{item.title}</h3>
          <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">{item.subtitle}</p>
          <div className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/80">
            View More
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function BookSpine({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.72, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, rotateY: -10, rotateX: 6 }}
      className={`group relative flex w-full max-w-[120px] flex-col justify-between rounded-t-[24px] px-4 pb-5 pt-6 shadow-2xl shadow-black/10 ${item.height}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className={`absolute inset-0 rounded-t-[24px] bg-gradient-to-b ${item.color}`} />
      <div className="absolute inset-y-0 right-0 w-3 rounded-r-[18px] bg-black/12" />
      <div className="absolute inset-[1px] rounded-t-[23px] border border-white/35" />
      <div className="relative z-10 flex h-full flex-col justify-between text-white">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80">{item.tone}</p>
        <h3 className="font-display text-lg font-semibold tracking-[-0.05em] [writing-mode:vertical-rl] rotate-180 md:text-xl">
          {item.title}
        </h3>
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const reduceMotion = useReducedMotion();
  const [activeGalleryItem, setActiveGalleryItem] = useState(null);
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [activeJourneyItem, setActiveJourneyItem] = useState(null);
  const heroRef = useRef(null);
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const { scrollYProgress: timelineScroll } = useScroll({ target: timelineRef, offset: ["start 75%", "end 20%"] });
  const layerOne = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -60]);
  const layerTwo = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 90]);
  const layerThree = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -110]);
  const timelineProgress = useTransform(timelineScroll, [0, 1], ["0%", "100%"]);
  const graphicDesignItems = galleryItems.filter((item) => item.category === "Graphic Design");
  const photographyItems = galleryItems.filter((item) => item.category === "Photography");

  return (
    <main className="relative overflow-hidden pb-20 text-ink md:pb-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8%] top-20 h-72 w-72 rounded-full bg-white/70 blur-3xl" />
        <div className="absolute right-[-6%] top-[22rem] h-[26rem] w-[26rem] rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute left-[12%] top-[76rem] h-80 w-80 rounded-full bg-sky-100/45 blur-3xl" />
        <div className="absolute right-[10%] top-[145rem] h-96 w-96 rounded-full bg-amber-100/40 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 px-4 pt-4 md:px-6">
        <div className="mx-auto flex w-full max-w-[1380px] items-center justify-between gap-4 rounded-full border border-white/45 bg-white/52 px-4 py-3 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:px-6">
          <button type="button" onClick={() => smoothScrollTo("hero")} className="font-display text-sm font-semibold tracking-[-0.03em] text-ink md:text-base">
            Adheesha Sooriyaarachchi
          </button>

          <nav className="hide-scrollbar flex max-w-[60vw] items-center gap-2 overflow-x-auto rounded-full bg-white/55 px-2 py-1.5 md:max-w-none md:gap-3 md:px-3">
            {navItems.map((item) => (
              item.href ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium text-zinc-600 transition hover:bg-white/70 hover:text-ink md:text-sm"
                >
                  {item.label}
                </a>
              ) : (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => smoothScrollTo(item.id)}
                  className="whitespace-nowrap rounded-full px-3 py-2 text-xs font-medium text-zinc-600 transition hover:bg-white/70 hover:text-ink md:text-sm"
                >
                  {item.label}
                </button>
              )
            ))}
          </nav>

          <button
            type="button"
            onClick={() => smoothScrollTo("contact")}
            className="hidden rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 md:inline-flex"
          >
            Let&apos;s Talk
          </button>
        </div>
      </header>

      <section id="hero" ref={heroRef} className="scroll-mt-28 px-4 pt-4 md:px-6 md:pt-6">
        <div className="relative mx-auto max-w-[1380px] overflow-hidden rounded-[42px] px-6 pb-8 pt-5 md:px-10 md:pb-10 md:pt-6">
          <div className="absolute inset-0 rounded-[42px] bg-gradient-to-br from-white/80 via-white/58 to-gold/10" />
          <div className="noise-mask rounded-[42px]" />
          <motion.div style={{ y: layerOne }} className="absolute left-[4%] top-[10%] h-40 w-40 rounded-[36px] bg-white/55 blur-sm glass-panel" />
          <motion.div style={{ y: layerTwo }} className="absolute right-[8%] top-[18%] h-52 w-52 rounded-full bg-gold/15 blur-3xl" />
          <motion.div style={{ y: layerThree }} className="absolute bottom-0 right-[18%] h-56 w-56 rounded-full bg-sky-100/70 blur-3xl" />

          <div className="relative z-10 grid min-h-[clamp(560px,68vh,720px)] items-start gap-6 pt-1 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-[760px] pt-10 lg:pt-12 lg:-mt-4">
              <motion.span
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-3 rounded-full bg-white/64 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-700 glass-soft"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                {heroContent.badge}
              </motion.span>

              <motion.h1
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="font-display mt-2 max-w-none text-[clamp(2.6rem,6vw,5.4rem)] font-semibold leading-[0.9] tracking-[-0.1em] text-ink"
              >
                {heroContent.headlineLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </motion.h1>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 26 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.82, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <RoleRoller roles={heroContent.roles} reduceMotion={reduceMotion} />
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.82, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
                className="mt-14"
              >
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => smoothScrollTo("projects")}
                    className="rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/10"
                  >
                    Explore Projects
                  </button>
                  <button
                    type="button"
                    onClick={() => smoothScrollTo("toolkit")}
                    className="rounded-full border border-white/50 bg-white/60 px-6 py-3.5 text-sm font-semibold text-ink glass-soft"
                  >
                    Open Toolkit
                  </button>
                  <a
                    href="/cv/CV%20ADHEESHA%20SOORIYAARACHCHI.pdf"
                    download
                    className="rounded-full border border-white/50 bg-white/60 px-6 py-3.5 text-sm font-semibold text-ink glass-soft"
                  >
                    Download CV
                  </a>
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-3 md:mt-8">
                  {socialLinks.map((item) => {
                    const Icon = socialIconMap[item.icon];
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        aria-label={item.label}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:bg-zinc-800"
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            <div className="grid gap-4 lg:justify-items-end">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 26 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[340px] justify-self-end rounded-[28px] bg-white/55 p-5 text-sm leading-8 text-zinc-600 glass-soft"
              >
                {heroContent.summary}
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.985 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="relative min-h-[400px] w-full max-w-[620px] overflow-hidden rounded-[38px] md:min-h-[580px] lg:-mt-16"
              >
                <motion.div style={{ y: layerOne }} className="absolute right-0 top-8 z-20 w-[220px] rounded-[28px] bg-white/58 p-4 text-[12px] font-medium leading-6 text-zinc-600 glass-panel md:right-1 md:top-auto md:bottom-44 md:w-[250px]">
                  {heroContent.portraitHighlight}
                </motion.div>
                <motion.div style={{ y: layerTwo }} className="absolute left-8 top-28 h-32 w-32 rounded-full bg-gold/15 blur-3xl" />
                <motion.div style={{ y: layerThree }} className="absolute bottom-16 left-5 z-20 rounded-[24px] bg-white/58 px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-700 glass-soft">
                  {heroContent.portraitCaption}
                </motion.div>

                <div className="absolute inset-x-0 bottom-0 top-14 rounded-[38px] bg-gradient-to-b from-white/35 via-white/12 to-white/6" />
                <div className="absolute inset-x-8 bottom-0 top-20 rounded-[32px] border border-white/50 bg-white/34 backdrop-blur-[10px]" />
                <div className="absolute inset-x-10 bottom-0 top-24 rounded-[30px] bg-gradient-to-b from-white/30 via-white/8 to-transparent" />

                <div className="absolute bottom-0 right-0 z-10 w-full max-w-[560px]">
                  <Image
                    src={heroContent.portrait}
                    alt="Adheesha Sooriyaarachchi portrait"
                    priority
                    className="h-auto w-full object-contain object-bottom-right"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-[#f4efe3] via-[#f4efe3]/78 to-transparent" />

                <motion.div
                  style={{ y: layerOne }}
                  className="absolute left-6 top-12 z-20 rounded-[26px] bg-white/64 p-4 text-sm leading-7 text-zinc-600 glass-panel md:left-8 md:max-w-[240px]"
                >
                  {heroContent.portraitNote}
                </motion.div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mt-6 grid gap-4 md:grid-cols-3"
          >
            {heroContent.stats.map((item) => (
              <div key={item.label} className="rounded-[24px] bg-white/55 px-5 py-4 glass-soft">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">{item.label}</p>
                <p className="mt-2 text-sm leading-7 text-zinc-700">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <a
        href="https://buymeacoffee.com/adeshasur"
        aria-label="Buy Me a Coffee"
        className="fixed bottom-5 left-5 z-[78] inline-flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white shadow-[0_18px_40px_rgba(15,23,42,0.22)] transition hover:-translate-y-1"
      >
        <Coffee className="h-5 w-5" />
      </a>

      <SectionReveal id="toolkit" className="scroll-mt-28 px-4 pt-20 md:px-6 md:pt-24">
        <div className="relative mx-auto max-w-[1380px] overflow-hidden rounded-[42px] px-6 py-8 md:px-10 md:py-10">
          <div className="absolute inset-0 rounded-[42px] bg-gradient-to-br from-white/60 via-white/30 to-emerald-50/55" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-gold/10 to-transparent" />
          <SectionIntro
            eyebrow="Toolkit Overview"
            title="Tool categories that open into a dedicated tools page."
            text="The home page stays lighter, while the full toolkit experience opens on its own page when you choose a category."
          />

          <div className="relative z-10 mt-8 grid gap-4 lg:grid-cols-3">
            {toolkitGroups.map((group, index) => (
              <ToolkitOverviewCard key={group.id} group={group} index={index} />
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal id="projects" className="scroll-mt-28 px-4 pt-20 md:px-6 md:pt-24" delay={0.04}>
        <div className="relative mx-auto max-w-[1380px] px-6 py-8 md:px-10 md:py-10">
          <SectionIntro
            eyebrow="Software Projects"
            title="Selected software projects with cleaner presentation."
            text="Concept builds and live projects presented in a tighter, more practical layout."
          />

          <div className="relative mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
            {softwareProjects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal id="gallery" className="scroll-mt-28 px-4 pt-20 md:px-6 md:pt-24" delay={0.08}>
        <div className="relative mx-auto max-w-[1380px] overflow-hidden rounded-[42px] px-6 py-8 md:px-10 md:py-10">
          <div className="absolute inset-0 rounded-[42px] bg-gradient-to-br from-white/68 via-white/38 to-rose-50/45" />
          <div className="absolute right-10 top-10 h-60 w-60 rounded-full bg-pink-100/50 blur-3xl" />
          <SectionIntro
            eyebrow="Graphic Designs"
            title="Graphic design work separated into its own lighter, mood-led gallery."
            text="Poster systems, brand layouts, and social visuals now sit in their own section so the design work reads as a focused collection."
          />

          <div className="relative z-10 mt-10 columns-1 gap-5 md:columns-2 xl:columns-3">
            {graphicDesignItems.map((item, index) => (
              <GalleryCard key={item.title} item={item} index={index} onOpen={setActiveGalleryItem} />
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal id="photography" className="scroll-mt-28 px-4 pt-10 md:px-6 md:pt-12" delay={0.1}>
        <div className="relative mx-auto max-w-[1380px] overflow-hidden rounded-[42px] px-6 py-8 md:px-10 md:py-10">
          <div className="absolute inset-0 rounded-[42px] bg-gradient-to-br from-white/70 via-slate-50/55 to-sky-50/45" />
          <div className="absolute left-10 top-10 h-60 w-60 rounded-full bg-sky-100/55 blur-3xl" />
          <SectionIntro
            eyebrow="Photographs"
            title="Photography now lives in a dedicated section of its own."
            text="Portraits, storytelling shots, and light studies stay together here so the photography side feels separate from the graphic design work."
          />

          <div className="relative z-10 mt-10 columns-1 gap-5 md:columns-2 xl:columns-3">
            {photographyItems.map((item, index) => (
              <GalleryCard key={item.title} item={item} index={index} onOpen={setActiveGalleryItem} />
            ))}
          </div>
        </div>
      </SectionReveal>

      <SectionReveal id="education" className="scroll-mt-28 px-4 pt-20 md:px-6 md:pt-24" delay={0.12}>
        <div ref={timelineRef} className="relative mx-auto max-w-[1380px] px-6 py-8 md:px-10 md:py-10">
          <SectionIntro
            eyebrow="Education"
            title="Education qualifications presented in one clear logo wall."
            text="Every qualification is easier to scan, while work experience stays visible here and also has its own page."
          />

          <div className="mt-12 space-y-6">
            <div className="py-1">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-[1.55rem] font-semibold tracking-[-0.06em] text-ink md:text-[1.95rem]">Education Qualifications</h3>
                <motion.div style={{ scaleY: timelineProgress }} className="hidden h-16 w-px origin-top bg-gradient-to-b from-gold to-amber-400 md:block" />
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {educationItems.map((item, index) => (
                  <JourneyCard
                    key={item.title + "-" + index}
                    item={item}
                    index={index}
                    onOpen={setActiveJourneyItem}
                    label="Education Qualification"
                  />
                ))}
              </div>
            </div>

            <div className="py-1">
              <h3 className="font-display text-[1.55rem] font-semibold tracking-[-0.06em] text-ink md:text-[1.95rem]">Working Experience</h3>
              <p className="mt-4 text-[15px] leading-8 text-zinc-600">
                Logos and roles stay visible here, while the full details open in a cleaner preview.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {experienceItems.map((item, index) => (
                  <JourneyCard
                    key={item.title + "-home-" + index}
                    item={item}
                    index={index + educationItems.length}
                    onOpen={setActiveJourneyItem}
                    label="Working Experience"
                  />
                ))}
              </div>
              <a
                href="/experience"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/10"
              >
                Open Experience Page
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div className="py-1">
              <h3 className="font-display text-[1.8rem] font-semibold tracking-[-0.06em] text-ink md:text-[2.15rem]">Achievements</h3>
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {achievementItems.map((item, index) => (
                  <motion.article
                    key={item.title + "-" + index}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.22 }}
                    transition={{ duration: 0.75, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-[28px] bg-white/68 p-5 glass-soft"
                  >
                    {item.image ? (
                      <div className="mx-auto mb-4 w-full max-w-[260px] overflow-hidden rounded-[22px] bg-white p-3 shadow-[0_18px_36px_rgba(15,23,42,0.08)]">
                        <div className={`relative overflow-hidden rounded-[18px] bg-zinc-50 ${item.imageOrientation === "portrait" ? "aspect-[0.82/1]" : "aspect-[4/3]"}`}>
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(min-width: 1280px) 18vw, (min-width: 768px) 28vw, 52vw"
                            className="object-contain object-center"
                          />
                        </div>
                      </div>
                    ) : null}
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">{item.year}</p>
                    <h4 className="font-display mt-3 text-2xl font-semibold tracking-[-0.05em] text-ink">{item.title}</h4>
                    <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">{item.subtitle}</p>
                    <p className="mt-4 text-[15px] leading-8 text-zinc-600">{item.body}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
      <SectionReveal id="certificates" className="scroll-mt-28 px-4 pt-20 md:px-6 md:pt-24" delay={0.14}>
        <div className="relative mx-auto max-w-[1380px] px-6 py-8 md:px-10 md:py-10">
          <SectionIntro
            eyebrow="Certificates"
            title="Certificates arranged in a tighter showcase."
            text="A cleaner certificate wall with smaller cards and better room for future additions."
          />
          <div className="relative mt-6 grid gap-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {certificateItems.map((item, index) => (
              <CertificateCard key={item.title} item={item} index={index} onOpen={setActiveCertificate} />
            ))}
          </div>
        </div>
      </SectionReveal>
      <SectionReveal id="books" className="scroll-mt-28 px-4 pt-20 md:px-6 md:pt-24" delay={0.16}>
        <div className="relative mx-auto max-w-[1380px] overflow-hidden rounded-[42px] px-6 py-8 md:px-10 md:py-10">
          <div className="absolute inset-0 rounded-[42px] bg-gradient-to-br from-white/62 via-white/24 to-amber-50/55" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#d1b27f]/18 to-transparent" />
          <SectionIntro
            eyebrow="Minimalist Bookshelf"
            title="A 3D-inspired shelf for the books and themes that shape design taste and interface thinking."
            text="Instead of plain text bullets, the shelf turns reading interests into a more tactile visual moment."
          />

          <div className="relative z-10 mt-16">
            <div className="absolute inset-x-0 bottom-2 h-5 rounded-full bg-black/8 blur-xl" />
            <div className="absolute inset-x-0 bottom-0 h-4 rounded-full bg-gradient-to-r from-[#d0b17e] via-[#b88f52] to-[#e2c28f]" />
            <div className="relative flex flex-wrap items-end justify-center gap-3 md:gap-4" style={{ perspective: 1200 }}>
              {bookshelfItems.map((item, index) => (
                <BookSpine key={item.title} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal id="contact" className="scroll-mt-28 px-4 pt-20 md:px-6 md:pt-24" delay={0.2}>
        <div className="relative mx-auto max-w-[1380px] overflow-hidden rounded-[42px] px-6 py-8 md:px-10 md:py-10">
          <div className="absolute inset-0 rounded-[42px] bg-gradient-to-br from-zinc-950 via-zinc-900 to-black" />
          <div className="absolute right-10 top-10 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
          <div className="absolute left-10 bottom-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <SectionIntro
                eyebrow="Contact"
                title={contactContent.title}
                text={contactContent.body}
                theme="dark"
              />
            </div>
            <div className="rounded-[32px] border border-white/10 bg-white/8 p-6 backdrop-blur-2xl md:p-8">
              <div className="grid gap-4">
                {contactContent.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-3 rounded-[22px] bg-white/10 px-4 py-4 text-zinc-100/90">
                    <WandSparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <p className="text-sm leading-7 md:text-[15px]">{bullet}</p>
                  </div>
                ))}
              </div>

              <div className="mt-14 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => smoothScrollTo("hero")}
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink"
                >
                  Back to Top
                </button>
                <a
                  href="https://github.com/adeshasur/Portfolio-Adheesha"
                  className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white"
                >
                  View Repository
                </a>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>

      <AnimatePresence>
        {activeJourneyItem ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[83] flex items-center justify-center bg-black/45 p-4 backdrop-blur-xl"
            onClick={() => setActiveJourneyItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-[34px] bg-white p-5 shadow-2xl shadow-black/20 md:p-6"
            >
              <div className="grid gap-6 md:grid-cols-[0.78fr_1.22fr] md:items-center">
                <div className="rounded-[28px] bg-white/85 p-4 shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
                  <div className="mx-auto flex aspect-square w-full max-w-[300px] items-center justify-center rounded-[24px] bg-white p-6">
                    {activeJourneyItem.image ? (
                      <Image src={activeJourneyItem.image} alt={activeJourneyItem.title} className="h-36 w-36 object-contain md:h-44 md:w-44" />
                    ) : null}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">{activeJourneyItem.label}</p>
                  <h3 className="font-display mt-4 text-3xl font-semibold tracking-[-0.06em] text-ink md:text-4xl">
                    {activeJourneyItem.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">{activeJourneyItem.subtitle}</p>
                  <p className="mt-4 text-[15px] leading-8 text-zinc-600 md:text-[16px]">
                    {activeJourneyItem.body}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {activeJourneyItem.href ? (
                      <a
                        href={activeJourneyItem.href}
                        className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
                      >
                        Visit Website
                      </a>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => setActiveJourneyItem(null)}
                      className="rounded-full bg-zinc-100 px-5 py-3 text-sm font-semibold text-ink"
                    >
                      Close Preview
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeCertificate ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[82] flex items-center justify-center bg-black/45 p-4 backdrop-blur-xl"
            onClick={() => setActiveCertificate(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-5xl overflow-hidden rounded-[34px] bg-white p-5 shadow-2xl shadow-black/20 md:p-6"
            >
              <div className={`grid gap-6 md:items-center ${activeCertificate.orientation === "portrait" ? "md:grid-cols-[0.78fr_1.22fr]" : "md:grid-cols-[1.08fr_0.92fr]"}`}>
                <div className={`relative overflow-hidden rounded-[28px] bg-white/85 p-3 shadow-[0_24px_60px_rgba(15,23,42,0.14)] ${activeCertificate.orientation === "portrait" ? "mx-auto max-w-[420px]" : ""}`}>
                  <div className={`relative overflow-hidden rounded-[22px] bg-white ${activeCertificate.orientation === "portrait" ? "aspect-[0.76/1]" : "aspect-[1.42/1]"}`}>
                    <Image
                      src={activeCertificate.image}
                      alt={activeCertificate.title}
                      fill
                      sizes="(min-width: 768px) 56vw, 90vw"
                      className="object-contain object-center bg-white p-1"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">{activeCertificate.label}</p>
                  <h3 className="font-display mt-4 text-3xl font-semibold tracking-[-0.06em] text-ink md:text-4xl">
                    {activeCertificate.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-8 text-zinc-600 md:text-[16px]">
                    {activeCertificate.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveCertificate(null)}
                    className="mt-8 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {activeGalleryItem ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/45 p-4 backdrop-blur-xl"
            onClick={() => setActiveGalleryItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-[34px] bg-white p-5 shadow-2xl shadow-black/20 md:p-6"
            >
              <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                <div className={`relative min-h-[320px] overflow-hidden rounded-[28px] p-5 ${activeGalleryItem.image ? "bg-zinc-100" : ""}`} style={activeGalleryItem.image ? undefined : { background: activeGalleryItem.accent }}>
                  {activeGalleryItem.image ? (
                    <>
                      <span className="absolute left-8 top-8 z-10 w-fit rounded-full bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                        {activeGalleryItem.category}
                      </span>
                      <div className="relative h-full min-h-[320px] overflow-hidden rounded-[22px] bg-white shadow-[0_22px_48px_rgba(15,23,42,0.14)]">
                        <Image
                          src={activeGalleryItem.image}
                          alt={activeGalleryItem.imageAlt || activeGalleryItem.title}
                          fill
                          sizes="(min-width: 768px) 56vw, 90vw"
                          className="object-contain bg-white p-2"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="noise-mask opacity-20" />
                      <div className="absolute inset-4 rounded-[24px] border border-white/40" />
                      <div className="absolute -right-10 top-6 h-28 w-28 rounded-full bg-white/40 blur-3xl" />
                      <div className="relative z-10 flex h-full flex-col justify-between">
                        <span className="w-fit rounded-full bg-white/72 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-700 glass-soft">
                          {activeGalleryItem.category}
                        </span>
                        <div>
                          <h3 className="font-display text-4xl font-semibold tracking-[-0.07em] text-ink">
                            {activeGalleryItem.title}
                          </h3>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Creative Lightbox</p>
                  <h3 className="font-display mt-4 text-3xl font-semibold tracking-[-0.06em] text-ink md:text-4xl">
                    {activeGalleryItem.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-8 text-zinc-600 md:text-[16px]">
                    {activeGalleryItem.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveGalleryItem(null)}
                    className="mt-8 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}




















