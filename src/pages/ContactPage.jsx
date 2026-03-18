import PageIntro from "../components/PageIntro";
import RevealSection from "../components/RevealSection";
import { contactCards } from "../data/siteData";

export default function ContactPage() {
  return (
    <main className="page-frame pb-16 pt-4 md:pb-20 md:pt-6">
      <PageIntro
        label="Contact"
        title="A direct contact page for portfolio work, redesigns, landing pages, and practical web tools."
        text="This page is kept intentionally simple. No extra boxes or template filler, just the main information needed to start a conversation."
        sideNote="If someone wants a sharper portfolio, a cleaner landing page, or a useful tool with stronger presentation, this is where the conversation begins."
      />

      <RevealSection className="mt-16">
        <div className="contact-stack">
          {contactCards.map((item) => (
            <article key={item.title} className="contact-row">
              <p className="contact-row-label">{item.title}</p>
              <p className="contact-row-value">{item.value}</p>
            </article>
          ))}
        </div>
      </RevealSection>
    </main>
  );
}
