import PageIntro from "../components/PageIntro";
import SectionHeading from "../components/SectionHeading";
import { educationItems, workItems } from "../data/siteData";

export default function AboutPage() {
  return (
    <main className="page-frame pb-8 pt-4 md:pb-12 md:pt-6">
      <PageIntro
        label="About Me"
        title="A UI-focused creative developer with equal respect for clarity and presentation."
        text="This page brings together my work experience, education, books, visual direction, and the wider thinking behind the products I build."
        sideNote="The goal is not just to show projects, but to show the taste, learning path, and creative decisions behind them."
      />

      <section className="mt-14 grid gap-6 xl:grid-cols-2">
        <div className="glass-panel p-6 md:p-8">
          <SectionHeading
            label="Working Experience"
            title="Professional exposure shaped around practical digital output."
          />
          <div className="mt-8 space-y-4">
            {workItems.map((item) => (
              <article key={item.name} className="glass-card flex gap-4 p-5">
                <img
                  src={item.image}
                  alt={`${item.name} logo`}
                  className="h-20 w-20 bg-white/80 object-contain p-3"
                />
                <div>
                  <h3 className="text-xl font-extrabold tracking-[-0.04em] text-ink">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-600">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 md:p-8">
          <SectionHeading
            label="Education"
            title="Institutions and learning foundations."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {educationItems.map((item) => (
              <article
                key={item.name}
                className="glass-card flex min-h-[150px] flex-col items-center justify-center gap-3 p-4 text-center"
              >
                <img
                  src={item.image}
                  alt={`${item.name} logo`}
                  className="h-20 w-full bg-white/80 object-contain p-3"
                />
                <span className="text-sm font-bold text-zinc-600">{item.name}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-14 glass-panel p-6 md:p-8">
        <SectionHeading
          label="Books, Design, Photography"
          title="The wider visual and thinking layers behind my work."
          text="I like building interfaces that feel deliberate. That comes from reading, observing composition, and studying how details influence trust and taste."
        />
      </section>
    </main>
  );
}
