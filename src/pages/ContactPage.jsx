import PageIntro from "../components/PageIntro";
import RevealSection from "../components/RevealSection";
import { contactCards } from "../data/siteData";

export default function ContactPage() {
  return (
    <main className="page-frame pb-16 pt-4 md:pb-20 md:pt-6">
      <PageIntro
        label="Contact"
        title="A simple contact page for new projects, redesigns, and modern portfolio work."
        text="This page stays clean and direct, without the extra workflow or FAQ sections that were not relevant to your portfolio."
        sideNote="If you want a portfolio redesign, landing page, or useful web tool with a stronger presentation, this is the place to start."
      />

      <RevealSection className="mt-16 grid gap-5 md:grid-cols-3">
        {contactCards.map((item) => (
          <article key={item.title} className="editorial-card p-6">
            <span className="section-chip">{item.title}</span>
            <p className="mt-5 text-lg font-semibold leading-8 text-ink">{item.value}</p>
          </article>
        ))}
      </RevealSection>
    </main>
  );
}
