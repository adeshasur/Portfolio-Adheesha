import { ArrowUpRight, Layers3, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import PageIntro from "../components/PageIntro";
import ProjectCard from "../components/ProjectCard";
import SectionHeading from "../components/SectionHeading";
import {
  heroHighlights,
  insightCards,
  portrait,
  projectLinks,
} from "../data/siteData";

export default function HomePage() {
  return (
    <main className="page-frame pb-8 pt-4 md:pb-12 md:pt-6">
      <section className="glass-panel overflow-hidden px-6 py-8 md:px-10 md:py-12">
        <div className="grid gap-10 xl:grid-cols-[1.08fr_0.92fr] xl:items-center">
          <div className="max-w-4xl">
            <div className="eyebrow-pill">
              <span className="h-2.5 w-2.5 bg-emerald-500" />
              Available for selected creative and product projects
            </div>
            <h1 className="headline-balance mt-6 font-extrabold text-ink">
              Glassy interfaces, 3D depth, and polished digital presentation.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 md:text-lg">
              A modern React and Tailwind portfolio built as a single landing flow,
              while still giving the hero navigation dedicated routes for About Me,
              Projects, and Contact.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/projects"
                className="inline-flex min-h-14 items-center justify-center bg-zinc-950 px-6 text-sm font-extrabold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-800"
              >
                Explore Projects
              </Link>
              <Link
                to="/about"
                className="inline-flex min-h-14 items-center justify-center bg-white/45 px-6 text-sm font-extrabold text-ink backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:text-gold"
              >
                About Me
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {heroHighlights.map((item) => (
                <span key={item} className="section-chip">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-scene relative mx-auto w-full max-w-[720px]">
            <div className="pointer-events-none absolute inset-x-12 bottom-10 top-12 bg-gradient-to-br from-gold/20 to-white/20 blur-3xl" />
            <div className="glass-stack relative aspect-[0.88]">
              <div className="glass-layer glass-layer-back absolute inset-0 glass-card" />
              <div className="glass-layer glass-layer-mid absolute inset-4 glass-card" />
              <div className="glass-layer glass-layer-front absolute inset-0 overflow-hidden bg-white/55 shadow-glass backdrop-blur-2xl">
                <div className="absolute left-6 top-6 flex items-center gap-2 text-sm font-semibold text-zinc-500">
                  <Sparkles className="h-4 w-4 text-gold" />
                  3D glass hero
                </div>
                <div className="absolute left-6 top-20 max-w-[240px] glass-card p-4 text-sm leading-7 text-zinc-600">
                  Hover depth, layered transparency, and a clean futuristic vibe without overloading the page.
                </div>
                <img
                  src={portrait}
                  alt="Adheesha Sooriyaarachchi portrait"
                  className="absolute bottom-0 right-0 h-[88%] w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          label="Main Flow"
          title="A single landing page with strong previews for the full portfolio story."
          text="The home experience works like a premium landing page, while the navigation leads to separate dedicated pages for deeper reading."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Layers3,
              title: "Single landing flow",
              text: "One strong homepage with sections that preview the main story clearly.",
            },
            {
              icon: Zap,
              title: "Dedicated pages",
              text: "About, Projects, and Contact routes give each important area space to breathe.",
            },
            {
              icon: ArrowUpRight,
              title: "Future-ready 3D direction",
              text: "CSS 3D layers are included now, and a Spline scene can be dropped into the hero later.",
            },
          ].map((item) => (
            <article key={item.title} className="glass-card tilt-card p-6">
              <item.icon className="h-8 w-8 text-gold" />
              <h3 className="mt-5 text-2xl font-extrabold tracking-[-0.04em] text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-zinc-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-16">
        <PageIntro
          label="Linked Pages"
          title="The landing page leads into dedicated deeper pages with the same visual system."
          text="About Me, Projects, and Contact are separated as their own routes, but still designed to feel like one product experience."
          sideNote="This keeps the hero flow clean while still giving room for richer content on dedicated pages."
        />
      </div>

      <section className="mt-16">
        <SectionHeading
          label="Projects Preview"
          title="Selected software projects presented in a softer glass system."
          text="Each live project keeps the clean product vibe while the landing page stays focused and elegant."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projectLinks.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              featured={index === 0}
            />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          label="Creative Range"
          title="A broader portfolio beyond code."
          text="The same landing page also previews design taste, photography direction, achievements, and the learning journey behind the work."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {insightCards.map((card) => (
            <article key={card.title} className="glass-card tilt-card p-6">
              <h3 className="text-2xl font-extrabold tracking-[-0.04em] text-ink">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-zinc-600">{card.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
