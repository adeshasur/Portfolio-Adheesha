import ProjectCard from "../components/ProjectCard";
import PageIntro from "../components/PageIntro";
import RevealSection from "../components/RevealSection";
import SectionHeading from "../components/SectionHeading";
import { projectLinks } from "../data/siteData";

export default function ProjectsPage() {
  const [leadProject, ...otherProjects] = projectLinks;

  return (
    <main className="page-frame pb-16 pt-4 md:pb-20 md:pt-6">
      <PageIntro
        label="Work"
        title="Live software projects built as useful products, not filler portfolio cards."
        text="This page is only about the tools you have actually built and published. The layout is intentionally cleaner, wider, and more natural so it feels like a real product showcase."
        sideNote="Every link stays direct and practical. The presentation is lighter, more editorial, and less boxed than the earlier template-style version."
      />

      <RevealSection className="mt-16">
        <SectionHeading
          label="Software Projects"
          title="A direct stream of real tools with clearer spacing, hierarchy, and breathing room."
          text="NIC Decoder, QR Studio, Vault Guard, Postal Code Finder, Text Transformer Pro, Chroma Craft, and Interest Calc Pro are presented as actual work, not oversized boxes."
        />
        <div className="project-stream mt-12">
          <ProjectCard project={leadProject} featured />
          {otherProjects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </RevealSection>
    </main>
  );
}
