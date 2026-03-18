import {
  ArrowUpRight,
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
  portfolioSections,
  portrait,
  projectLinks,
  workItems,
} from "../data/siteData";

const sectionIcons = {
  Education: GraduationCap,
  "Working Experience": BriefcaseBusiness,
  Books: BookOpenText,
  "Graphic Designs": Palette,
  "Software Projects": Wrench,
  Photographs: Camera,
  Achievements: Trophy,
};

const creativeCollections = [
  {
    title: "Books",
    description: "Reading that sharpens taste, clarity, and decision making.",
    items: bookItems,
  },
  {
    title: "Graphic Designs",
    description: "Visual work shaped by stronger hierarchy and cleaner tone.",
    items: designItems,
  },
  {
    title: "Photographs",
    description: "Portraits, framing, and atmosphere that influence visual rhythm.",
    items: photographyItems,
  },
  {
    title: "Achievements",
    description: "Visible progress through public releases and portfolio growth.",
    items: achievementItems,
  },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const layerOneY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 120]);
  const layerTwoY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -80]);
  const layerThreeY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 55]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -35]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.18]);

  return (
    <main className="page-frame pb-10 pt-4 md:pb-14 md:pt-6">
      <section
        id="home"
        ref={heroRef}
        className="glass-panel section-anchor overflow-hidden px-6 py-8 md:px-10 md:py-12 xl:px-12"
      >
        <div className="grid gap-12 xl:grid-cols-[1.02fr_0.98fr] xl:items-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div className="eyebrow-pill">
              <span className="h-2.5 w-2.5 bg-emerald-500" />
              Available for selected creative and product projects
            </div>
            <h1 className="headline-balance mt-6 font-extrabold text-ink">
              Glassy portfolio motion with smooth depth around a clean framed portrait.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 md:text-lg">
              The homepage stays as one polished landing flow, while navigation glides to
              About, Projects, and Contact anchors instead of breaking the experience.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <LandingScrollLink
                href="/#projects"
                className="inline-flex min-h-14 items-center justify-center bg-zinc-950 px-6 text-sm font-extrabold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-800"
              >
                Explore Projects
              </LandingScrollLink>
              <LandingScrollLink
                href="/#about"
                className="inline-flex min-h-14 items-center justify-center bg-white/45 px-6 text-sm font-extrabold text-ink backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:text-gold"
              >
                Scroll to About
              </LandingScrollLink>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {heroHighlights.map((item) => (
                <span key={item} className="section-chip">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 36 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto flex w-full max-w-[760px] items-center justify-center"
          >
            <motion.div
              style={{ y: layerOneY, scale: glowScale }}
              className="pointer-events-none absolute left-[6%] top-[8%] h-40 w-40 rounded-full bg-gold/15 blur-3xl md:h-56 md:w-56"
            />
            <motion.div
              style={{ y: layerTwoY }}
              className="pointer-events-none absolute right-[8%] top-[12%] h-56 w-56 rounded-full bg-white/85 blur-3xl md:h-72 md:w-72"
            />
            <motion.div
              style={{ y: layerThreeY }}
              className="pointer-events-none absolute bottom-[8%] left-[12%] h-44 w-44 rounded-full bg-zinc-200/45 blur-3xl md:h-60 md:w-60"
            />

            <div className="relative aspect-[0.9] w-full max-w-[620px]">
              <motion.div
                style={{ y: layerOneY }}
                className="glass-orb absolute left-[3%] top-[10%] h-28 w-28 md:h-36 md:w-36"
              />
              <motion.div
                style={{ y: layerTwoY }}
                className="glass-sheet absolute right-[4%] top-[6%] h-[52%] w-[54%]"
              />
              <motion.div
                style={{ y: layerThreeY }}
                className="glass-sheet absolute bottom-[8%] left-[2%] h-[38%] w-[42%] bg-white/38"
              />

              <motion.div
                style={{ y: portraitY }}
                className="portrait-frame absolute inset-x-[9%] bottom-0 top-[8%] flex items-end justify-center overflow-hidden"
              >
                <div className="portrait-glow absolute inset-x-10 bottom-0 top-10" />
                <div className="glass-card absolute left-6 top-6 max-w-[220px] p-4 text-sm leading-7 text-zinc-600">
                  Flat portrait treatment with layered glass depth moving at different scroll speeds.
                </div>
                <img
                  src={portrait}
                  alt="Adheesha Sooriyaarachchi portrait"
                  className="relative z-10 h-[92%] w-auto object-contain"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <RevealSection id="about" className="section-anchor mt-16">
        <SectionHeading
          label="About"
          title="One landing flow that clearly previews the full portfolio story."
          text="Education, working experience, books, graphic designs, photographs, and achievements are now treated as connected sections instead of disconnected page ideas."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {portfolioSections.map((section) => {
            const Icon = sectionIcons[section.title] ?? ArrowUpRight;
            return (
              <article key={section.title} className="glass-card lift-card p-6">
                <Icon className="h-7 w-7 text-gold" />
                <h3 className="mt-5 text-2xl font-extrabold tracking-[-0.04em] text-ink">
                  {section.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">
                  {section.description}
                </p>
              </article>
            );
          })}
        </div>
      </RevealSection>

      <RevealSection className="mt-16 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]" delay={0.05}>
        <div className="glass-panel p-6 md:p-8">
          <SectionHeading
            label="Education"
            title="Institutions and learning foundations behind the work."
            text="These learning spaces shaped how I approach structure, communication, and technical execution."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {educationItems.map((item) => (
              <article key={item.name} className="glass-card lift-card flex min-h-[200px] flex-col justify-between gap-4 p-4">
                <img
                  src={item.image}
                  alt={`${item.name} logo`}
                  className="h-20 w-full object-contain"
                />
                <div>
                  <h3 className="text-lg font-extrabold tracking-[-0.03em] text-ink">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-600">{item.focus}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 md:p-8">
          <SectionHeading
            label="Working Experience"
            title="Professional exposure that shaped output quality and presentation."
            text="Each role helped sharpen how I think about polish, speed, and digital clarity."
          />
          <div className="mt-8 space-y-4">
            {workItems.map((item) => (
              <article key={item.name} className="glass-card lift-card flex gap-4 p-5">
                <img
                  src={item.image}
                  alt={`${item.name} logo`}
                  className="h-20 w-20 object-contain"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-extrabold tracking-[-0.04em] text-ink">
                      {item.name}
                    </h3>
                    <span className="section-chip">{item.role}</span>
                  </div>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    {item.period}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection id="projects" className="section-anchor mt-16" delay={0.08}>
        <SectionHeading
          label="Projects"
          title="Live tools and utility products linked directly from the landing page."
          text="The scroll flow stays seamless, and project browsing now stays fully inside the landing page experience."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projectLinks.map((project, index) => (
            <ProjectCard key={project.name} project={project} featured={index === 0} />
          ))}
        </div>
      </RevealSection>

      <RevealSection className="mt-16" delay={0.12}>
        <SectionHeading
          label="Creative Collections"
          title="Books, designs, photographs, and achievements stay inside the same visual rhythm."
          text="The site feels broader than a software-only portfolio, but still minimal and controlled."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {creativeCollections.map((collection) => (
            <article key={collection.title} className="glass-card lift-card p-6">
              <h3 className="text-2xl font-extrabold tracking-[-0.04em] text-ink">
                {collection.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                {collection.description}
              </p>
              <div className="mt-5 space-y-3">
                {collection.items.map((item) => (
                  <div key={item.title} className="bg-white/35 px-4 py-3 backdrop-blur-xl">
                    <p className="text-sm font-extrabold text-ink">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">{item.note}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </RevealSection>

      <RevealSection id="contact" className="section-anchor mt-16" delay={0.16}>
        <SectionHeading
          label="Contact"
          title="Smooth landing flow, then a clear handoff for the next conversation."
          text="You can glide here directly from the hero navigation without leaving the single landing-page experience."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {contactCards.map((item) => (
            <article key={item.title} className="glass-card lift-card p-6">
              <span className="section-chip">{item.title}</span>
              <p className="mt-5 text-lg font-extrabold tracking-[-0.03em] text-ink">
                {item.value}
              </p>
            </article>
          ))}
        </div>
      </RevealSection>
    </main>
  );
}

