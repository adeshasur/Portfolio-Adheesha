import ProjectCard from "../components/ProjectCard";
import PageIntro from "../components/PageIntro";
import RevealSection from "../components/RevealSection";
import SectionHeading from "../components/SectionHeading";
import { projectLinks } from "../data/siteData";

export default function ProjectsPage() {
  return (
    <main className="page-frame pb-16 pt-4 md:pb-20 md:pt-6">
      <PageIntro
        label="Work"
        title="Live software projects built and published as real tools."
        text="This page is focused only on your software products and links, without extra template-style sections that don't belong to your portfolio."
        sideNote="All project links stay direct and practical, while the surrounding layout keeps the same premium portfolio style."
      />

      <RevealSection className="mt-16">
        <SectionHeading
          label="Software Projects"
          title="Your actual live tools, presented in a cleaner project system."
          text="NIC Decoder, QR Studio, Vault Guard, Postal Code Finder, Text Transformer Pro, Chroma Craft, and Interest Calc Pro are grouped here clearly."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projectLinks.map((project, index) => (
            <ProjectCard key={project.name} project={project} featured={index < 2} />
          ))}
        </div>
      </RevealSection>
    </main>
  );
}
