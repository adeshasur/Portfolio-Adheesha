import PageIntro from "../components/PageIntro";
import ProjectCard from "../components/ProjectCard";
import SectionHeading from "../components/SectionHeading";
import { projectLinks } from "../data/siteData";

export default function ProjectsPage() {
  return (
    <main className="page-frame pb-8 pt-4 md:pb-12 md:pt-6">
      <PageIntro
        label="Projects"
        title="Utility products and polished frontend work."
        text="This page is dedicated to the software side of the portfolio: live tools, sharper interfaces, and practical products with a more premium presentation."
        sideNote="Each project stays in the same glassy system so the site feels like one connected experience, not separate mismatched pages."
      />

      <section className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projectLinks.map((project, index) => (
          <ProjectCard key={project.name} project={project} featured={index === 0} />
        ))}
      </section>
    </main>
  );
}
