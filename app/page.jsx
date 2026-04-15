"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Coffee, Facebook, Github, Instagram, Linkedin, Sparkles, WandSparkles, X } from "lucide-react";
import { useEffect, useRef, useState, forwardRef } from "react";
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function SectionIntro({ eyebrow, title, text, align = "left", theme = "light" }) {
  const dark = theme === "dark";

  return (
    <div className={`relative z-10 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] ${dark ? "bg-white/10 text-gold" : "bg-white/55 text-gold glass-soft"}`}>
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </span>
      <h2 className={`font-display text-balance mt-5 text-[clamp(1.75rem,5vw,3.6rem)] font-semibold leading-[0.92] tracking-[-0.08em] ${dark ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      <p className={`mt-4 max-w-xl text-[14px] leading-7 md:text-[15px] ${dark ? "text-zinc-300" : "text-zinc-600"}`}>
        {text}
      </p>
    </div>
  );
}

function SplitText({ text, delay = 0, reduceMotion }) {
  const letters = text.split("");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay }
    }
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: 90,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  if (reduceMotion) return <span>{text}</span>;

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className="inline-block"
      style={{ perspective: 600 }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block whitespace-pre"
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

const SectionReveal = forwardRef(({ children, className = "", delay = 0, id }, ref) => {
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.95, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
});
SectionReveal.displayName = "SectionReveal";



function TiltCard({ children, className = "", reduceMotion }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);
  
  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  function handleMouseMove(e) {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX - width / 2);
    y.set(mouseY - height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        perspective: 1200
      }}
      className={`group/tilt ${className}`}
    >
      {children}
    </motion.div>
  );
}

function MagneticWrapper({ children, intensity = 0.35, reduceMotion }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove(e) {
    if (reduceMotion) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    x.set(distanceX * intensity);
    y.set(distanceY * intensity);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

function HeroSpotlight({ reduceMotion }) {
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (reduceMotion) return;
    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 opacity-40 transition-opacity duration-1000 group-hover:opacity-70"
      style={{
        background: useTransform(
          [mouseX, mouseY],
          ([x, y]) => `radial-gradient(1000px circle at ${x}px ${y}px, rgba(199, 165, 84, 0.08), transparent 80%)`
        ),
      }}
    />
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

function AchievementCard({ item, index, onOpen, reduceMotion }) {
  const [activeImage, setActiveImage] = useState(0);
  const images = item.images || (item.image ? [item.image] : []);
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    if (reduceMotion || !hasMultipleImages) return undefined;

    const timer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [reduceMotion, hasMultipleImages, images.length]);

  return (
    <TiltCard reduceMotion={reduceMotion} className="flex h-full flex-col">
    <motion.button
      type="button"
      onClick={() => onOpen(item)}
      variants={staggerItem}
      whileHover={{ y: -8, z: 20 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[24px] bg-white/68 p-4 text-left glass-soft card-glow-hover transition-all duration-500 [transform-style:preserve-3d]"
    >
      {images.length > 0 ? (
        <div className="relative mx-auto mb-4 w-full overflow-hidden rounded-[18px] bg-white p-2 shadow-[0_12px_28px_rgba(15,23,42,0.05)] [transform:translateZ(40px)]">
          <div className="relative overflow-hidden rounded-[14px] bg-zinc-50 aspect-[3/4]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={images[activeImage]}
                  alt={`${item.title} image ${activeImage + 1}`}
                  fill
                  sizes="(min-width: 1280px) 15vw, (min-width: 768px) 45vw, 92vw"
                  className="object-contain object-center"
                />
              </motion.div>
            </AnimatePresence>
            
            {hasMultipleImages && (
              <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1.5 z-10">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${i === activeImage ? "w-3 bg-gold" : "w-1 bg-zinc-300/50"}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
      
      <div className="flex flex-col flex-grow [transform:translateZ(20px)]">
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
          {item.year}
        </p>
        <h4 className="font-display mt-2 text-[1.12rem] font-semibold tracking-[-0.03em] leading-tight text-ink md:text-[1.25rem]">
          {item.title}
        </h4>
        <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500 text-balance">
          {item.subtitle}
        </p>
        <div className="mt-4 flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/70">
          Open Preview
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </motion.button>
    </TiltCard>
  );
}



function ToolkitOverviewCard({ group, index, reduceMotion }) {
  return (
    <TiltCard reduceMotion={reduceMotion} className="flex h-full flex-col">
      <motion.button
        type="button"
        onClick={() => smoothScrollTo(group.id)}
        variants={staggerItem}
        whileHover={{ y: -8, z: 20 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[24px] bg-white/68 p-4 text-left glass-soft card-glow-hover transition-all duration-500 [transform-style:preserve-3d]"
      >
        <div className="relative mx-auto mb-4 w-full overflow-hidden rounded-[18px] bg-white p-2 shadow-[0_12px_28px_rgba(15,23,42,0.05)] [transform:translateZ(40px)]">
          <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden rounded-[14px] bg-zinc-50" style={{ background: group.accent }}>
            <div className="noise-mask opacity-20" />
            <div className="flex flex-col items-center gap-2 px-4 text-center">
              <span className="text-3xl filter drop-shadow-md">🛠️</span>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink/40">
                {group.items.length} Tools
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-grow flex-col [transform:translateZ(20px)]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
            {group.eyebrow}
          </p>
          <h4 className="font-display mt-2 text-[1.12rem] font-semibold tracking-[-0.03em] leading-tight text-ink md:text-[1.25rem]">
            {group.title}
          </h4>
          <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-zinc-500">
            {group.description}
          </p>
          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/70">
              Explore Tools
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </motion.button>
    </TiltCard>
  );
}

function ProjectCard({ project, index, onOpen, reduceMotion }) {
  const canPreview = Boolean(project.shots?.length);
  const imageClassName = project.imageContain ? "object-contain p-3" : "object-cover";

  return (
    <TiltCard reduceMotion={reduceMotion} className="flex h-full flex-col">
      <motion.button
        type="button"
        onClick={() => onOpen(project)}
        variants={staggerItem}
        whileHover={{ y: -8, z: 20 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[24px] bg-white/68 p-4 text-left glass-soft card-glow-hover transition-all duration-500 [transform-style:preserve-3d]"
      >
        <div className="relative mx-auto mb-4 w-full overflow-hidden rounded-[18px] bg-white p-2 shadow-[0_12px_28px_rgba(15,23,42,0.05)] [transform:translateZ(40px)]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[14px] bg-zinc-50 border border-black/5">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(min-width: 1536px) 15vw, (min-width: 1280px) 18vw, (min-width: 768px) 45vw, 92vw"
                className={`${imageClassName} transition-transform duration-700 group-hover/image:scale-[1.05]`}
              />
            ) : (
               <div className="flex h-full items-center justify-center bg-white/40">
                <span className="text-4xl">{project.icon || "💻"}</span>
              </div>
            )}
            <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
              {project.status || "Project"}
            </span>
          </div>
        </div>

        <div className="flex flex-grow flex-col [transform:translateZ(20px)]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
            {project.type || "Software Development"}
          </p>
          <h4 className="font-display mt-2 text-[1.12rem] font-semibold tracking-[-0.03em] leading-tight text-ink md:text-[1.25rem]">
            {project.name}
          </h4>
          <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-zinc-500 text-balance">
            {project.description}
          </p>
          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/70">
              {canPreview ? "Open Preview" : "View Details"}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </motion.button>
    </TiltCard>
  );
}

function GalleryCard({ item, index, onOpen, reduceMotion }) {
  const hasImage = Boolean(item.image);

  return (
    <TiltCard reduceMotion={reduceMotion} className="flex h-full flex-col">
      <motion.button
        type="button"
        onClick={() => onOpen(item)}
        variants={staggerItem}
        whileHover={{ y: -8, z: 20 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[24px] bg-white/68 p-4 text-left glass-soft card-glow-hover transition-all duration-500 [transform-style:preserve-3d]"
      >
        <div className="relative mx-auto mb-4 w-full overflow-hidden rounded-[18px] bg-white p-2 shadow-[0_12px_28px_rgba(15,23,42,0.05)] [transform:translateZ(40px)]">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[14px] bg-zinc-50 border border-black/5">
            {hasImage ? (
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1536px) 18vw, (min-width: 1280px) 22vw, (min-width: 768px) 34vw, 92vw"
                className="object-contain bg-white p-2 transition-transform duration-700 group-hover/image:scale-[1.05]"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-zinc-100" style={{ background: item.accent }}>
                <span className="text-3xl opacity-40">🎬</span>
              </div>
            )}
            <span className="absolute left-3 top-3 z-10 rounded-full bg-black/70 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
              {item.category}
            </span>
          </div>
        </div>

        <div className="flex flex-grow flex-col [transform:translateZ(20px)]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
             Creative Gallery
          </p>
          <h4 className="font-display mt-2 text-[1.12rem] font-semibold tracking-[-0.03em] leading-tight text-ink md:text-[1.25rem]">
            {item.title}
          </h4>
          <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-zinc-500">
            {item.description}
          </p>
          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/70">
              Open Gallery
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </motion.button>
    </TiltCard>
  );
}

function CertificateCard({ item, index, onOpen }) {
  const isPortrait = item.orientation === "portrait";

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(item)}
      variants={staggerItem}
      whileHover={{ y: -10, rotateX: 4, rotateY: index % 2 === 0 ? -4 : 4 }}
      className="group relative mx-auto flex h-full w-full flex-col overflow-hidden rounded-[24px] bg-white/68 p-4 text-left glass-soft card-glow-hover transition-all duration-500"
    >
      <div className="noise-mask opacity-20" />
      <div className="relative z-10">
        <div className={`relative overflow-hidden rounded-[18px] bg-white p-2 shadow-[0_12px_28px_rgba(15,23,42,0.05)] ${isPortrait ? "mx-auto max-w-[220px]" : ""}`}>
          <div className={`relative overflow-hidden rounded-[14px] bg-white ${isPortrait ? "aspect-[3/4]" : "aspect-[3/2]"}`}>
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(min-width: 1536px) 18vw, (min-width: 1280px) 20vw, (min-width: 768px) 28vw, 46vw"
              className="object-contain object-center bg-white p-1 transition duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">{item.label}</p>
          <h3 className="font-display mt-1.5 text-[1rem] font-semibold tracking-[-0.06em] text-ink md:text-[1.1rem]">{item.title}</h3>
          <p className="mt-1.5 text-[11px] leading-5 text-zinc-600 md:text-[12px]">{item.description}</p>
        </div>
      </div>
    </motion.button>
  );
}

function JourneyCard({ item, index, onOpen, label, reduceMotion }) {
  return (
    <TiltCard reduceMotion={reduceMotion} className="flex h-full flex-col">
      <motion.button
        type="button"
        onClick={() => onOpen(item)}
        variants={staggerItem}
        whileHover={{ y: -8, z: 20 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[24px] bg-white/68 p-4 text-left glass-soft card-glow-hover transition-all duration-500 [transform-style:preserve-3d]"
      >
        <div className="relative mx-auto mb-4 w-full overflow-hidden rounded-[18px] bg-white p-2 shadow-[0_12px_28px_rgba(15,23,42,0.05)] [transform:translateZ(40px)]">
          <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden rounded-[14px] bg-zinc-50 border border-black/5">
            {item.image ? (
              <Image 
                src={item.image} 
                alt={item.title} 
                className={`h-24 w-24 object-contain transition-transform duration-700 group-hover/image:scale-[1.1] ${item.imageClassName || ""}`.trim()} 
              />
            ) : (
              <div className="flex flex-col items-center gap-2 opacity-30">
                <span className="text-3xl">🏢</span>
              </div>
            )}
            <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
              {label.split(" ")[0]}
            </span>
          </div>
        </div>

        <div className="flex flex-grow flex-col [transform:translateZ(20px)]">
          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
            {item.subtitle}
          </p>
          <h4 className="font-display mt-2 text-[1.12rem] font-semibold tracking-[-0.03em] leading-tight text-ink md:text-[1.25rem]">
            {item.title}
          </h4>
          <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-zinc-500">
            {item.body}
          </p>
          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink/70">
              View Milestones
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </motion.button>
    </TiltCard>
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
  const [activeProject, setActiveProject] = useState(null);
  const [activeProjectShotIndex, setActiveProjectShotIndex] = useState(0);
  const [activeGalleryItem, setActiveGalleryItem] = useState(null);
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [activeAchievement, setActiveAchievement] = useState(null);
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
  const videoEditingItems = galleryItems.filter((item) => item.category === "Video Editing");
  const activeProjectShot = activeProject?.shots?.[activeProjectShotIndex] || activeProject?.shots?.[0];

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

          <nav className="flex items-center gap-1 rounded-full bg-white/45 p-1.5 glass-panel">
            {navItems.map((item) => (
              "id" in item ? (
                <MagneticWrapper key={item.id} reduceMotion={reduceMotion} intensity={0.2}>
                  <button
                    type="button"
                    onClick={() => smoothScrollTo(item.id)}
                    className="rounded-full px-4 py-2 text-xs font-semibold text-ink transition duration-300 hover:bg-white/60"
                  >
                    {item.label}
                  </button>
                </MagneticWrapper>
              ) : (
                <MagneticWrapper key={item.href} reduceMotion={reduceMotion} intensity={0.2}>
                  <a
                    href={item.href}
                    className="rounded-full px-4 py-2 text-xs font-semibold text-ink transition duration-300 hover:bg-white/60"
                  >
                    {item.label}
                  </a>
                </MagneticWrapper>
              )
            ))}
          </nav>

          <MagneticWrapper reduceMotion={reduceMotion} intensity={0.25}>
            <button
              type="button"
              onClick={() => smoothScrollTo("contact")}
              className="hidden rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 md:inline-flex"
            >
              Let&apos;s Talk
            </button>
          </MagneticWrapper>
        </div>
      </header>

      <SectionReveal id="hero" ref={heroRef} className="scroll-mt-28 px-4 pt-4 md:px-6 md:pt-6">

        <HeroSpotlight reduceMotion={reduceMotion} />
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
                <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                {heroContent.badge}
              </motion.span>

              <h1
                className="font-display mt-2 max-w-none text-[clamp(2.4rem,7vw,5.2rem)] font-semibold leading-[0.9] tracking-[-0.1em] text-ink"
              >
                {heroContent.headlineLines.map((line, i) => (
                  <span key={line} className="block overflow-hidden">
                    <SplitText text={line} delay={0.2 + i * 0.15} reduceMotion={reduceMotion} />
                  </span>
                ))}
              </h1>

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
                className="mt-16 md:mt-20"
              >
                <div className="flex flex-wrap gap-3">
                  <MagneticWrapper reduceMotion={reduceMotion}>
                    <button
                      type="button"
                      onClick={() => smoothScrollTo("projects")}
                      className="rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/10"
                    >
                      Explore Projects
                    </button>
                  </MagneticWrapper>
                  <MagneticWrapper reduceMotion={reduceMotion}>
                    <button
                      type="button"
                      onClick={() => smoothScrollTo("toolkit")}
                      className="rounded-full border border-white/50 bg-white/60 px-6 py-3.5 text-sm font-semibold text-ink glass-soft"
                    >
                      Open Toolkit
                    </button>
                  </MagneticWrapper>
                  <MagneticWrapper reduceMotion={reduceMotion}>
                    <a
                      href="/CV.pdf"
                      target="_blank"
                      className="hidden rounded-full border border-ink/15 bg-white/45 px-6 py-3.5 text-sm font-semibold text-ink glass-soft sm:inline-flex"
                    >
                      Download CV
                    </a>
                  </MagneticWrapper>
                </div>
                <div className="mt-10 flex flex-wrap items-center gap-4 md:mt-12">
                  {socialLinks.map((item) => {
                    const Icon = socialIconMap[item.icon];
                    return (
                      <MagneticWrapper key={item.label} reduceMotion={reduceMotion} intensity={0.4}>
                        <a
                          href={item.href}
                          aria-label={item.label}
                          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1.5 hover:bg-zinc-800 hover:shadow-xl"
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      </MagneticWrapper>
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
        </div>
      </SectionReveal>

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

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative z-10 mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          >
            {toolkitGroups.map((group, index) => (
              <ToolkitOverviewCard key={group.id} group={group} index={index} reduceMotion={reduceMotion} />
            ))}
          </motion.div>
        </div>
      </SectionReveal>

      <SectionReveal id="projects" className="scroll-mt-28 px-4 pt-20 md:px-6 md:pt-24" delay={0.04}>
        <div className="relative mx-auto max-w-[1380px] px-6 py-8 md:px-10 md:py-10">
          <SectionIntro
            eyebrow="Software Projects"
            title="Selected software projects with cleaner presentation."
            text="Concept builds and live projects presented in a tighter, more practical layout."
          />

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          >
            {softwareProjects.map((project, index) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={index}
                reduceMotion={reduceMotion}
                onOpen={(selectedProject) => {
                  setActiveProject(selectedProject);
                  setActiveProjectShotIndex(0);
                }}
              />
            ))}
          </motion.div>
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

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative z-10 mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          >
            {graphicDesignItems.map((item, index) => (
              <GalleryCard 
                key={item.title} 
                item={item} 
                index={index} 
                onOpen={setActiveGalleryItem} 
                reduceMotion={reduceMotion} 
              />
            ))}
          </motion.div>
        </div>
      </SectionReveal>

      <SectionReveal id="video-editing" className="scroll-mt-28 px-4 pt-10 md:px-6 md:pt-12" delay={0.1}>
        <div className="relative mx-auto max-w-[1380px] overflow-hidden rounded-[42px] px-6 py-8 md:px-10 md:py-10">
          <div className="absolute inset-0 rounded-[42px] bg-gradient-to-br from-white/70 via-slate-50/55 to-sky-50/45" />
          <div className="absolute left-10 top-10 h-60 w-60 rounded-full bg-sky-100/55 blur-3xl" />
          <SectionIntro
            eyebrow="Video Editing"
            title="Video editing now lives in a dedicated section of its own."
            text="Cuts, visual rhythm, and edited storytelling moments stay together here so the video-editing side feels separate from the graphic design work."
          />

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative z-10 mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          >
            {videoEditingItems.map((item, index) => (
              <GalleryCard 
                key={item.title} 
                item={item} 
                index={index} 
                onOpen={setActiveGalleryItem} 
                reduceMotion={reduceMotion} 
              />
            ))}
          </motion.div>
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
                <h3 className="font-display text-[clamp(1.4rem,4vw,1.95rem)] font-semibold tracking-[-0.06em] text-ink">Education Qualifications</h3>
                <motion.div style={{ scaleY: timelineProgress }} className="hidden h-16 w-px origin-top bg-gradient-to-b from-gold to-amber-400 md:block" />
              </div>
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
              >
                {educationItems.map((item, index) => (
                  <JourneyCard
                    key={item.title + "-" + index}
                    item={item}
                    index={index}
                    onOpen={setActiveJourneyItem}
                    label="Education Qualification"
                    reduceMotion={reduceMotion}
                  />
                ))}
              </motion.div>
            </div>

            <div className="py-1">
              <h3 className="font-display text-[clamp(1.4rem,4vw,1.95rem)] font-semibold tracking-[-0.06em] text-ink">Working Experience</h3>
              <p className="mt-4 text-[15px] leading-8 text-zinc-600">
                Logos and roles stay visible here, while the full details open in a cleaner preview.
              </p>
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
              >
                {experienceItems.map((item, index) => (
                  <JourneyCard
                    key={item.title + "-home-" + index}
                    item={item}
                    index={index + educationItems.length}
                    onOpen={setActiveJourneyItem}
                    label="Working Experience"
                    reduceMotion={reduceMotion}
                  />
                ))}
              </motion.div>
              <MagneticWrapper reduceMotion={reduceMotion} intensity={0.25}>
                <a
                  href="/experience"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition duration-300 hover:scale-[1.02]"
                >
                  Open Experience Page
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </MagneticWrapper>
            </div>

            <div className="py-1">
              <h3 className="font-display text-[clamp(1.4rem,4vw,2.15rem)] font-semibold tracking-[-0.06em] text-ink">Achievements & Events</h3>
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
              >
                {achievementItems.map((item, index) => (
                  <AchievementCard
                    key={item.title + "-" + index}
                    item={item}
                    index={index}
                    onOpen={setActiveAchievement}
                    reduceMotion={reduceMotion}
                  />
                ))}
              </motion.div>
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
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5"
          >
            {certificateItems.map((item, index) => (
              <CertificateCard key={item.title} item={item} index={index} onOpen={setActiveCertificate} />
            ))}
          </motion.div>
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
                <MagneticWrapper reduceMotion={reduceMotion} intensity={0.25}>
                  <button
                    type="button"
                    onClick={() => smoothScrollTo("hero")}
                    className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition duration-300 hover:bg-zinc-100"
                  >
                    Back to Top
                  </button>
                </MagneticWrapper>
                <MagneticWrapper reduceMotion={reduceMotion} intensity={0.25}>
                  <a
                    href="https://github.com/adeshasur/Portfolio-Adheesha"
                    className="rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-white/15"
                  >
                    View Repository
                  </a>
                </MagneticWrapper>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>

      <AnimatePresence>
        {activeProject && activeProjectShot ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[84] flex items-center justify-center bg-black/45 p-4 backdrop-blur-xl"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-6xl overflow-hidden rounded-[34px] bg-white p-5 shadow-2xl shadow-black/20 md:p-6"
            >
              <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-start">
                <div className="rounded-[28px] bg-zinc-100 p-3 shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
                  <div className="relative overflow-hidden rounded-[22px] bg-white">
                    <div className="relative aspect-[16/11]">
                      <Image
                        src={activeProjectShot.image}
                        alt={activeProjectShot.title}
                        fill
                        sizes="(min-width: 1024px) 54vw, 94vw"
                        className="object-contain bg-white p-3"
                      />
                    </div>
                  </div>
                  {activeProject.shots.length > 1 ? (
                    <div className="mt-4 grid grid-cols-5 gap-2">
                      {activeProject.shots.map((shot, index) => (
                        <button
                          key={shot.title}
                          type="button"
                          onClick={() => setActiveProjectShotIndex(index)}
                          className={`relative overflow-hidden rounded-[18px] border bg-white p-1.5 transition ${index === activeProjectShotIndex ? "border-ink shadow-[0_16px_36px_rgba(15,23,42,0.12)]" : "border-black/8 hover:border-black/20"}`}
                        >
                          <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-zinc-50">
                            <Image
                              src={shot.image}
                              alt={shot.title}
                              fill
                              sizes="160px"
                              className="object-contain bg-white p-1.5"
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                    {activeProject.previewLabel || "Project Preview"}
                  </p>
                  <h3 className="font-display mt-4 text-3xl font-semibold tracking-[-0.06em] text-ink md:text-4xl">
                    {activeProject.name}
                  </h3>
                  <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
                    {activeProject.type}
                  </p>
                  <p className="mt-4 text-[15px] leading-8 text-zinc-600 md:text-[16px]">
                    {activeProject.longDescription || activeProject.description}
                  </p>

                  <div className="mt-6 rounded-[24px] bg-zinc-50 px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                      {activeProjectShot.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-zinc-600">
                      {activeProjectShot.description}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {activeProject.details.map((detail) => (
                      <span key={detail} className="rounded-full bg-zinc-100 px-3 py-1.5 text-[11px] font-semibold text-zinc-700">
                        {detail}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {activeProject.links?.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
                      >
                        {link.label}
                      </a>
                    ))}
                    <button
                      type="button"
                      onClick={() => setActiveProject(null)}
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
        {activeAchievement ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[84] flex items-center justify-center bg-black/45 p-4 backdrop-blur-xl"
            onClick={() => setActiveAchievement(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-5xl overflow-hidden rounded-[34px] bg-white p-5 shadow-2xl shadow-black/20 md:p-6"
            >
              <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
                <div className="relative overflow-hidden rounded-[28px] bg-white/85 p-3 shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
                   <div className="relative overflow-hidden rounded-[22px] bg-white aspect-[3/4]">
                      <AchievementCard
                        item={activeAchievement}
                        index={0}
                        onOpen={() => {}}
                        reduceMotion={reduceMotion}
                      />
                   </div>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">{activeAchievement.year}</p>
                  <h3 className="font-display mt-4 text-3xl font-semibold tracking-[-0.06em] text-ink md:text-4xl">
                    {activeAchievement.title}
                  </h3>
                  <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">{activeAchievement.subtitle}</p>
                  <p className="mt-6 text-[15px] leading-8 text-zinc-600 md:text-[16px]">
                    {activeAchievement.body}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveAchievement(null)}
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
                  <div className={`relative overflow-hidden rounded-[22px] bg-white ${activeCertificate.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[14/10]"}`}>
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





















