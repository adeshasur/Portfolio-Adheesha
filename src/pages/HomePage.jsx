import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import RevealSection from "../components/RevealSection";
import SectionHeading from "../components/SectionHeading";
import {
  heroMeta,
  heroSummary,
  heroTitle,
  navLinks,
  overviewCards,
  portrait,
  projectLinks,
} from "../data/siteData";

export default function HomePage() {
  const reduceMotion = useReducedMotion();
  const featuredProjects = projectLinks.slice(0, 4);

  return (
    <main className="page-frame pb-16 pt-4 md:pb-20 md:pt-6">
      <section className="home-hero-shell overflow-hidden px-8 pb-8 pt-5 md:px-10 md:pb-10 xl:px-12">
        <div className="hero-topbar">
          <Link to="/" className="brand-link">
            Adheesha Sooriyaarachchi
          </Link>

          <nav className="nav-center">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          <Link to="/contact" className="header-cta">
            Let&apos;s Talk
          </Link>
        </div>

        <div className="home-hero-grid home-hero-grid-clean">
          <motion.div
            className="hero-copy-left"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="availability-pill">
              <span className="availability-dot" />
              {heroMeta}
            </div>
            <h1 className="home-hero-title mt-7">{heroTitle}</h1>
          </motion.div>

          <motion.div
            className="hero-copy-right"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="hero-summary">{heroSummary}</p>
            <Link to="/contact" className="hero-email-btn mt-8">
              Email Me
            </Link>
          </motion.div>

          <motion.div
            className="hero-portrait-column hero-portrait-corner"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-portrait-glow" />
            <img
              src={portrait}
              alt="Adheesha Sooriyaarachchi portrait"
              className="hero-portrait-image hero-portrait-image-corner"
            />
            <div className="hero-portrait-fade" />
          </motion.div>
        </div>
      </section>

      <RevealSection className="mt-20">
        <SectionHeading
          label="Portfolio Overview"
          title="Everything in this portfolio is now centered around your real work and creative story."
          text="Only your actual categories stay here: education, working experience, books, graphic designs, software projects, photographs, and achievements."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {overviewCards.map((item) => (
            <article key={item.title} className="editorial-card p-6">
              <h3 className="text-[1.7rem] font-semibold tracking-[-0.05em] text-ink">{item.title}</h3>
              <p className="mt-3 text-[15px] leading-7 text-zinc-600">{item.description}</p>
            </article>
          ))}
        </div>
      </RevealSection>

      <RevealSection className="mt-20">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            label="Software Projects"
            title="Live tools and utility products linked directly from your portfolio."
            text="These are your real software projects, not template placeholders."
          />
          <Link to="/works" className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
            View All Works <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.name} project={project} featured={index < 2} />
          ))}
        </div>
      </RevealSection>

      <RevealSection className="mt-20 grid gap-5 md:grid-cols-2 xl:grid-cols-3" delay={0.06}>
        <article className="info-panel">
          <h3 className="text-[1.9rem] font-semibold tracking-[-0.05em] text-ink">About & Experience</h3>
          <p className="mt-3 text-[15px] leading-7 text-zinc-600">
            Education, working experience, books, designs, photographs, and achievements in one place.
          </p>
          <Link to="/about" className="panel-link mt-6 inline-flex items-center gap-2">
            Explore About <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
        <article className="info-panel">
          <h3 className="text-[1.9rem] font-semibold tracking-[-0.05em] text-ink">Selected Work</h3>
          <p className="mt-3 text-[15px] leading-7 text-zinc-600">
            NIC Decoder, QR Studio, Vault Guard, Postal Code Finder, Text Transformer Pro, Chroma Craft, and Interest Calc Pro.
          </p>
          <Link to="/works" className="panel-link mt-6 inline-flex items-center gap-2">
            Open Works <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
        <article className="info-panel">
          <h3 className="text-[1.9rem] font-semibold tracking-[-0.05em] text-ink">Contact</h3>
          <p className="mt-3 text-[15px] leading-7 text-zinc-600">
            For portfolio redesigns, landing pages, or useful web tools with stronger presentation.
          </p>
          <Link to="/contact" className="panel-link mt-6 inline-flex items-center gap-2">
            Let&apos;s Talk <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
      </RevealSection>
    </main>
  );
}
