import ProjectCard from "../components/ProjectCard";
import PageIntro from "../components/PageIntro";
import RevealSection from "../components/RevealSection";
import SectionHeading from "../components/SectionHeading";
import { projectLinks, serviceCards } from "../data/siteData";

export default function ProjectsPage() {
  return (
    <main className="page-frame pb-16 pt-4 md:pb-20 md:pt-6">
      <PageIntro
        label="Work"
        title="A dedicated works page for live tools and product-focused frontend pieces."
        text="This route carries the same premium portfolio direction as the homepage, but gives more room to the software projects themselves."
        sideNote="The project links stay practical and direct, while the surrounding layout keeps the presentation sharper and more deliberate."
      />

      <RevealSection className="mt-16">
        <SectionHeading
          label="Selected Projects"
          title="Live tools built for practical use and cleaner digital presentation."
          text="Your portfolio tools are grouped here like product cards, closer to the reference website's work section style."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projectLinks.map((project, index) => (
            <ProjectCard key={project.name} project={project} featured={index < 2} />
          ))}
        </div>
      </RevealSection>

      <RevealSection className="mt-16" delay={0.06}>
        <SectionHeading
          label="Capabilities"
          title="Design and frontend services that support the work behind the tools."
          text="The works page also keeps the same supporting card language used on the home route."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {serviceCards.map((item) => (
            <article key={item.title} className={`service-card ${item.tone === "dark" ? "service-card-dark" : ""}`}>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold tracking-[-0.02em]">{item.title}</span>
                <span className="text-xs uppercase tracking-[0.18em] opacity-60">Focus</span>
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
    </main>
  );
}
