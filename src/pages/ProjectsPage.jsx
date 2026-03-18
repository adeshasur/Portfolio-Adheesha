import PageIntro from "../components/PageIntro";
import ProjectCard from "../components/ProjectCard";
import SectionHeading from "../components/SectionHeading";
import { projectLinks } from "../data/siteData";

export default function ProjectsPage() {
  return (
    <main className="page-frame pb-10 pt-4 md:pb-14 md:pt-6">
      <PageIntro
        label="Projects"
        title="Software projects presented as clean, polished mini-products."
        text="This page is dedicated to the software side of the portfolio with all live tools linked clearly inside the same visual system."
        sideNote="The project buttons open in the same tab so the browsing flow feels direct and simple."
      />

      <section className="mt-14 glass-panel p-6 md:p-8">
        <SectionHeading
          label="Software Projects"
          title="Live tools built for practical use and cleaner presentation."
          text="NIC Decoder, QR Studio, Vault Guard, Postal Code Finder, Text Transformer Pro, Chroma Craft, and Interest Calc Pro are now grouped in one dedicated project page."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projectLinks.map((project, index) => (
            <ProjectCard key={project.name} project={project} featured={index === 0} />
          ))}
        </div>
      </section>
    </main>
  );
}
