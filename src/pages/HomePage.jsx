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
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import SectionHeading from "../components/SectionHeading";
import {
  achievementItems,
  bookItems,
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
  return (
    <main className="page-frame pb-10 pt-4 md:pb-14 md:pt-6">
      <section className="glass-panel overflow-hidden px-6 py-8 md:px-10 md:py-12 xl:px-12">
        <div className="grid gap-10 xl:grid-cols-[1.08fr_0.92fr] xl:items-center">
          <div className="max-w-4xl">
            <div className="eyebrow-pill">
              <span className="h-2.5 w-2.5 bg-emerald-500" />
              Available for selected creative and product projects
            </div>
            <h1 className="headline-balance mt-6 font-extrabold text-ink">
              One clean landing page for design, code, tools, and creative work.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-600 md:text-lg">
              This portfolio now flows as one modern white landing page while still
              linking to dedicated About Me, Projects, and Contact routes from the hero.
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
                  Landing page hero
                </div>
                <div className="absolute left-6 top-20 max-w-[250px] glass-card p-4 text-sm leading-7 text-zinc-600">
                  Education, experience, books, designs, software projects, photographs,
                  and achievements all previewed in one continuous flow.
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
          label="Portfolio Sections"
          title="Everything important is now visible in one landing-page system."
          text="Instead of hidden placeholders, the homepage previews every major area of the portfolio in the same visual language."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {portfolioSections.map((section) => {
            const Icon = sectionIcons[section.title] ?? ArrowUpRight;
            return (
              <article key={section.title} className="glass-card tilt-card p-6">
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
      </section>

      <section className="mt-16 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-panel p-6 md:p-8">
          <SectionHeading
            label="Education"
            title="Institutions and learning foundations behind the work."
            text="These learning spaces shaped how I approach structure, communication, and technical execution."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {educationItems.map((item) => (
              <article
                key={item.name}
                className="glass-card flex min-h-[200px] flex-col justify-between gap-4 p-4"
              >
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
              <article key={item.name} className="glass-card flex gap-4 p-5">
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
      </section>

      <section className="mt-16">
        <SectionHeading
          label="Software Projects"
          title="Live tools and utility products linked directly from the portfolio."
          text="These links open in the same tab and act like product cards inside the landing page, not random detached buttons."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projectLinks.map((project, index) => (
            <ProjectCard key={project.name} project={project} featured={index === 0} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          label="Creative Collections"
          title="Books, designs, photographs, and achievements are now explicit parts of the portfolio."
          text="This keeps the portfolio broader than only code while staying inside one clean visual system."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {creativeCollections.map((collection) => (
            <article key={collection.title} className="glass-card tilt-card p-6">
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
      </section>
    </main>
  );
}
