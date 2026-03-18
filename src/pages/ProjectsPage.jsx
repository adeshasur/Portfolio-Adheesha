import ProjectCard from "../components/ProjectCard";
import SectionHeading from "../components/SectionHeading";
import { projectLinks } from "../data/siteData";

export default function ProjectsPage() {
  return (
    <main className="page-frame pb-8 pt-4 md:pb-12 md:pt-6">
      <section className="glass-panel px-6 py-8 md:px-10 md:py-12">
        <SectionHeading
          label="Projects"
          title="Utility products and polished frontend work."
          text="This page is dedicated to the software side of the portfolio: live tools, sharper interfaces, and practical products with a more premium presentation."
        />
      </section>

      <section className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projectLinks.map((project, index) => (
          <ProjectCard key={project.name} project={project} featured={index === 0} />
        ))}
      </section>
    </main>
  );
}
