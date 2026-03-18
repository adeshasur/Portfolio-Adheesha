import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import RevealSection from "../components/RevealSection";
import SectionHeading from "../components/SectionHeading";
import {
  faqItems,
  heroMeta,
  heroSummary,
  heroTitle,
  navLinks,
  portrait,
  projectLinks,
  serviceCards,
  workflowSteps,
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

        <div className="home-hero-grid">
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
            className="hero-portrait-column"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-portrait-glow" />
            <img
              src={portrait}
              alt="Adheesha Sooriyaarachchi portrait"
              className="hero-portrait-image"
            />
            <div className="hero-portrait-fade" />
          </motion.div>

          <motion.div
            className="hero-copy-right"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="hero-summary">{heroSummary}</p>
            <Link to="/contact" className="hero-email-btn mt-8">
              Email Me
            </Link>
          </motion.div>
        </div>
      </section>

      <RevealSection className="mt-20">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            label="Featured Works"
            title="Selected software projects presented in a cleaner portfolio system."
            text="The first showcase section follows the same image-first rhythm as the reference, but uses your own live tools and product links."
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

      <RevealSection className="mt-20" delay={0.04}>
        <SectionHeading
          label="Services"
          title="Creative direction and frontend delivery with a cleaner product feel."
          text="A simple three-card section like the reference layout, centered around the strongest frontend offer."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {serviceCards.map((item) => (
            <article key={item.title} className={`service-card ${item.tone === "dark" ? "service-card-dark" : ""}`}>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold tracking-[-0.02em]">{item.title}</span>
                <span className="text-xs uppercase tracking-[0.18em] opacity-60">2026</span>
              </div>
              <p className="mt-4 text-sm leading-7 opacity-80">{item.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="service-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </RevealSection>

      <RevealSection className="mt-20" delay={0.08}>
        <section className="workflow-shell overflow-hidden px-6 py-8 md:px-8 md:py-10 xl:px-10">
          <div className="grid gap-10 xl:grid-cols-[0.7fr_1.3fr] xl:items-start">
            <div className="max-w-[420px]">
              <span className="section-chip">Workflow</span>
              <h2 className="section-title mt-5 text-white">
                A simple and efficient process to bring your vision to life.
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-zinc-400">
                From the first call to final delivery, every step is designed for clarity and efficiency.
              </p>
            </div>
            <div className="workflow-steps">
              {workflowSteps.map((item, index) => (
                <article
                  key={item.step}
                  className="workflow-step-card"
                  style={{ marginLeft: `${index % 2 === 0 ? 0 : 56}px` }}
                >
                  <span className="workflow-step-number">{item.step}</span>
                  <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      <RevealSection className="mt-20 grid gap-10 xl:grid-cols-[0.82fr_1.18fr] xl:items-start" delay={0.12}>
        <div className="max-w-[460px]">
          <SectionHeading
            label="FAQs"
            title="Answers to common questions to help you understand the process and how we can work together."
            text="This keeps the lower part of the landing page informative, like the sample reference."
          />
          <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-zinc-950 px-4 py-3 text-sm font-semibold text-white">
            <BriefcaseBusiness className="h-4 w-4" />
            Project Flow
          </div>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <details key={item.question} className="faq-item" open={index === 0}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </RevealSection>

      <RevealSection className="mt-20 grid gap-5 md:grid-cols-2 xl:grid-cols-3" delay={0.16}>
        <article className="info-panel">
          <GraduationCap className="h-5 w-5 text-gold" />
          <h3 className="mt-5 text-[1.9rem] font-semibold tracking-[-0.05em] text-ink">Education</h3>
          <p className="mt-3 text-[15px] leading-7 text-zinc-600">
            Institutions and learning foundations that shaped the technical side of the work.
          </p>
          <Link to="/about" className="panel-link mt-6 inline-flex items-center gap-2">
            Explore About <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
        <article className="info-panel">
          <BriefcaseBusiness className="h-5 w-5 text-gold" />
          <h3 className="mt-5 text-[1.9rem] font-semibold tracking-[-0.05em] text-ink">Experience</h3>
          <p className="mt-3 text-[15px] leading-7 text-zinc-600">
            Practical digital work that sharpened polish, speed, and delivery quality.
          </p>
          <Link to="/about" className="panel-link mt-6 inline-flex items-center gap-2">
            View Story <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
        <article className="info-panel">
          <ArrowRight className="h-5 w-5 text-gold" />
          <h3 className="mt-5 text-[1.9rem] font-semibold tracking-[-0.05em] text-ink">Contact</h3>
          <p className="mt-3 text-[15px] leading-7 text-zinc-600">
            For portfolios, landing pages, or useful tools with stronger visual presentation.
          </p>
          <Link to="/contact" className="panel-link mt-6 inline-flex items-center gap-2">
            Let&apos;s Talk <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
      </RevealSection>
    </main>
  );
}

