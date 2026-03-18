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
    <main className="page-frame page-flow pb-20 pt-4 md:pb-24 md:pt-6">
      <section className="hero-plain">
        <div className="hero-topbar hero-topbar-plain">
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

        <div className="hero-editorial-grid">
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
            transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="hero-summary">{heroSummary}</p>
            <Link to="/contact" className="hero-email-btn mt-8">
              Email Me
            </Link>
          </motion.div>

          <motion.div
            className="hero-photo-shell"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
            animate={reduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-portrait-glow" />
            <img src={portrait} alt="Adheesha Sooriyaarachchi portrait" className="hero-photo-image" />
            <div className="hero-portrait-fade" />
          </motion.div>
        </div>
      </section>

      <RevealSection className="section-block mt-24">
        <SectionHeading
          label="Portfolio Overview"
          title="Everything here is built around your real work and creative direction."
          text="No filler template sections. Only your actual portfolio story: education, working experience, books, graphic designs, software projects, photographs, and achievements."
        />
        <div className="overview-list mt-10">
          {overviewCards.map((item) => (
            <div key={item.title} className="overview-line">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </RevealSection>

      <RevealSection className="section-block mt-24">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            label="Software Projects"
            title="Live tools and utility products linked directly from your portfolio."
            text="These are your real software projects, presented with more breathing room and less boxed template styling."
          />
          <Link to="/works" className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
            View All Works <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="project-stream mt-12">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.name} project={project} featured={index === 0} />
          ))}
        </div>
      </RevealSection>

      <RevealSection className="section-block mt-24" delay={0.06}>
        <SectionHeading
          label="Explore More"
          title="Move through the portfolio without filler sections or generic cards."
          text="Each page focuses on a real part of your profile instead of trying to imitate a template structure."
        />
        <div className="overview-list mt-10">
          <div className="overview-line overview-line-link">
            <h3>About</h3>
            <p>Education, working experience, books, designs, photographs, and achievements in one place.</p>
            <Link to="/about" className="panel-link inline-flex items-center gap-2">Open About <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="overview-line overview-line-link">
            <h3>Works</h3>
            <p>NIC Decoder, QR Studio, Vault Guard, Postal Code Finder, Text Transformer Pro, Chroma Craft, and Interest Calc Pro.</p>
            <Link to="/works" className="panel-link inline-flex items-center gap-2">Open Works <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="overview-line overview-line-link">
            <h3>Contact</h3>
            <p>For portfolio redesigns, landing pages, or useful web tools with stronger presentation.</p>
            <Link to="/contact" className="panel-link inline-flex items-center gap-2">Let&apos;s Talk <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </RevealSection>
    </main>
  );
}
