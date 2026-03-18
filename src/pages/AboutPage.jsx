import {
  achievementItems,
  bookItems,
  designItems,
  educationItems,
  photographyItems,
  workItems,
} from "../data/siteData";
import PageIntro from "../components/PageIntro";
import RevealSection from "../components/RevealSection";
import SectionHeading from "../components/SectionHeading";

const collections = [
  { title: "Books", items: bookItems },
  { title: "Graphic Designs", items: designItems },
  { title: "Photographs", items: photographyItems },
  { title: "Achievements", items: achievementItems },
];

export default function AboutPage() {
  return (
    <main className="page-frame pb-16 pt-4 md:pb-20 md:pt-6">
      <PageIntro
        label="About"
        title="The wider story behind the portfolio: learning, experience, creativity, and growth."
        text="This page follows the same minimal portfolio system as the homepage while giving more space to education, working experience, books, designs, photographs, and achievements."
        sideNote="Instead of feeling like a separate product, the page keeps the same typography, spacing, card treatment, and overall visual tone."
      />

      <RevealSection className="mt-16 grid gap-6 xl:grid-cols-2">
        {workItems.map((item) => (
          <article key={item.name} className="editorial-card p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <img src={item.image} alt={`${item.name} logo`} className="h-16 w-16 object-contain" />
              <span className="section-chip">{item.period}</span>
            </div>
            <h3 className="mt-6 text-[2rem] font-semibold tracking-[-0.05em] text-ink">{item.name}</h3>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">{item.role}</p>
            <p className="mt-4 text-[15px] leading-7 text-zinc-600">{item.description}</p>
          </article>
        ))}
      </RevealSection>

      <RevealSection className="mt-16" delay={0.05}>
        <SectionHeading
          label="Education"
          title="Institutions and learning foundations that shaped the technical and creative direction."
          text="Education remains part of the portfolio narrative rather than hidden away as plain list content."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {educationItems.map((item) => (
            <article key={item.name} className="editorial-card flex min-h-[220px] flex-col justify-between p-6">
              <img src={item.image} alt={`${item.name} logo`} className="h-20 w-full object-contain" />
              <div className="pt-8">
                <h3 className="text-[1.6rem] font-semibold tracking-[-0.04em] text-ink">{item.name}</h3>
                <p className="mt-3 text-[15px] leading-7 text-zinc-600">{item.focus}</p>
              </div>
            </article>
          ))}
        </div>
      </RevealSection>

      <RevealSection className="mt-16" delay={0.1}>
        <SectionHeading
          label="Creative Profile"
          title="Books, designs, photographs, and achievements complete the wider portfolio story."
          text="These sections show taste, discipline, and visual curiosity behind the software work."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {collections.map((collection) => (
            <article key={collection.title} className="editorial-card p-6">
              <h3 className="text-[2rem] font-semibold tracking-[-0.05em] text-ink">{collection.title}</h3>
              <div className="mt-6 space-y-3">
                {collection.items.map((item) => (
                  <div key={item.title} className="subtle-stack-card px-4 py-4">
                    <p className="text-sm font-semibold text-ink">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">{item.note}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </RevealSection>
    </main>
  );
}
