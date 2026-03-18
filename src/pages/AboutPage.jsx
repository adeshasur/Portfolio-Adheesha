import {
  achievementItems,
  bookItems,
  designItems,
  educationItems,
  photographyItems,
  workItems,
} from "../data/siteData";
import PageIntro from "../components/PageIntro";
import SectionHeading from "../components/SectionHeading";

const creativeCollections = [
  {
    title: "Books",
    items: bookItems,
  },
  {
    title: "Graphic Designs",
    items: designItems,
  },
  {
    title: "Photographs",
    items: photographyItems,
  },
  {
    title: "Achievements",
    items: achievementItems,
  },
];

export default function AboutPage() {
  return (
    <main className="page-frame pb-10 pt-4 md:pb-14 md:pt-6">
      <PageIntro
        label="About Me"
        title="A UI-focused creative developer with a broader portfolio story behind the code."
        text="This page now brings together education, working experience, books, graphic design, photographs, and achievements in the same system as the landing page."
        sideNote="The goal is to make the portfolio feel complete and connected, not like isolated sections with different visual rules."
      />

      <section className="mt-14 grid gap-6 xl:grid-cols-2">
        <div className="glass-panel p-6 md:p-8">
          <SectionHeading
            label="Working Experience"
            title="Professional exposure shaped by practical digital output."
            text="Hands-on work sharpened the way I approach polish, structure, and delivery quality."
          />
          <div className="mt-8 space-y-4">
            {workItems.map((item) => (
              <article key={item.name} className="glass-card flex gap-4 p-5">
                <img
                  src={item.image}
                  alt={`${item.name} logo`}
                  className="h-20 w-20 object-contain"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-extrabold tracking-[-0.04em] text-ink">
                      {item.name}
                    </h3>
                    <span className="section-chip">{item.role}</span>
                  </div>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    {item.period}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">
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
            title="Institutions and learning foundations that shaped the technical side."
            text="These learning environments supported both structured knowledge and creative growth."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {educationItems.map((item) => (
              <article key={item.name} className="glass-card flex min-h-[200px] flex-col gap-4 p-4">
                <img
                  src={item.image}
                  alt={`${item.name} logo`}
                  className="h-20 w-full object-contain"
                />
                <div>
                  <h3 className="text-lg font-extrabold tracking-[-0.03em] text-ink">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-600">{item.focus}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-14">
        <SectionHeading
          label="Creative Profile"
          title="Books, designs, photographs, and achievements complete the wider portfolio story."
          text="These sections show the taste, discipline, and visual curiosity behind the software work."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {creativeCollections.map((collection) => (
            <article key={collection.title} className="glass-card p-6">
              <h3 className="text-2xl font-extrabold tracking-[-0.04em] text-ink">
                {collection.title}
              </h3>
              <div className="mt-5 space-y-3">
                {collection.items.map((item) => (
                  <div key={item.title} className="bg-white/35 px-4 py-3 backdrop-blur-xl">
                    <p className="text-sm font-extrabold text-ink">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">{item.note}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
