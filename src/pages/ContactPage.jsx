import PageIntro from "../components/PageIntro";
import RevealSection from "../components/RevealSection";
import SectionHeading from "../components/SectionHeading";
import { contactCards, faqItems, workflowSteps } from "../data/siteData";

export default function ContactPage() {
  return (
    <main className="page-frame pb-16 pt-4 md:pb-20 md:pt-6">
      <PageIntro
        label="Contact"
        title="A cleaner handoff for new projects, redesigns, and modern portfolio work."
        text="For premium landing pages, portfolio redesigns, or useful web tools, this page keeps the same simple structure and visual rhythm as the rest of the website."
        sideNote="The goal is to make every route feel consistent, not like different templates stitched together."
      />

      <RevealSection className="mt-16 grid gap-5 md:grid-cols-3">
        {contactCards.map((item) => (
          <article key={item.title} className="editorial-card p-6">
            <span className="section-chip">{item.title}</span>
            <p className="mt-5 text-lg font-semibold leading-8 text-ink">{item.value}</p>
          </article>
        ))}
      </RevealSection>

      <RevealSection className="mt-16" delay={0.05}>
        <section className="workflow-shell overflow-hidden px-6 py-8 md:px-8 md:py-10 xl:px-10">
          <div className="grid gap-10 xl:grid-cols-[0.7fr_1.3fr] xl:items-start">
            <div className="max-w-[420px]">
              <span className="section-chip">Workflow</span>
              <h2 className="section-title mt-5 text-white">
                A simple and efficient process to bring your vision to life.
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-zinc-400">
                The same workflow section style from the homepage is repeated here to keep the page system consistent.
              </p>
            </div>
            <div className="workflow-steps">
              {workflowSteps.map((item, index) => (
                <article
                  key={item.step}
                  className="workflow-step-card"
                  style={{ marginLeft: `${index % 2 === 0 ? 0 : 56}px` }}
                >
                  <span className="workflow-step-number">{item.step}</span>
                  <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      <RevealSection className="mt-16 grid gap-10 xl:grid-cols-[0.82fr_1.18fr] xl:items-start" delay={0.1}>
        <div className="max-w-[460px]">
          <SectionHeading
            label="FAQs"
            title="Answers to common questions before starting a project together."
            text="A simplified FAQ section that continues the same lower-page structure used on the homepage."
          />
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <details key={item.question} className="faq-item" open={index === 0}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </RevealSection>
    </main>
  );
}
