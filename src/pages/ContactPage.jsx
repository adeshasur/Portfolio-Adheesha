import SectionHeading from "../components/SectionHeading";
import { contactCards } from "../data/siteData";

export default function ContactPage() {
  return (
    <main className="page-frame pb-8 pt-4 md:pb-12 md:pt-6">
      <section className="glass-panel px-6 py-8 md:px-10 md:py-12">
        <SectionHeading
          label="Contact"
          title="Let's build a premium-looking digital experience."
          text="For portfolio websites, landing pages, or useful web tools, I prefer clean structure, modern visuals, and frontend output that feels finished."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {contactCards.map((item) => {
            const content = (
              <article className="glass-card tilt-card h-full p-6">
                <span className="section-chip">{item.title}</span>
                <p className="mt-5 text-lg font-extrabold tracking-[-0.03em] text-ink">
                  {item.value}
                </p>
              </article>
            );

            return item.href ? (
              <a key={item.title} href={item.href}>
                {content}
              </a>
            ) : (
              <div key={item.title}>{content}</div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
