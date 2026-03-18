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
        title="Education, working experience, books, designs, photographs, and achievements in one portfolio story."
        text="This page keeps only the parts that belong to your actual profile. The structure is simplified so your background reads more like a personal portfolio and less like a template."
        sideNote="The goal here is clarity and personality: real education, real work exposure, and the creative interests that shape how you design and build."
      />

      <RevealSection className="mt-16">
        <SectionHeading
          label="Working Experience"
          title="Professional experience that shaped the way you approach digital output, presentation, and delivery."
          text="These are the work environments that influenced your creative and product-facing execution."
        />
        <div className="story-list mt-10">
          {workItems.map((item) => (
            <article key={item.name} className="story-row">
              <div className="story-row-head">
                <img src={item.image} alt={`${item.name} logo`} className="story-logo" />
                <div>
                  <p className="story-kicker">{item.period}</p>
                  <h3 className="story-title">{item.name}</h3>
                  <p className="story-role">{item.role}</p>
                </div>
              </div>
              <p className="story-text">{item.description}</p>
            </article>
          ))}
        </div>
      </RevealSection>

      <RevealSection className="mt-16" delay={0.05}>
        <SectionHeading
          label="Education"
          title="Learning foundations that support the technical side, visual thinking, and creative growth."
          text="Education is shown as part of the overall story, with simple presentation instead of box-heavy cards."
        />
        <div className="logo-wall mt-10">
          {educationItems.map((item) => (
            <article key={item.name} className="logo-entry">
              <img src={item.image} alt={`${item.name} logo`} className="logo-entry-image" />
              <div>
                <h3 className="logo-entry-title">{item.name}</h3>
                <p className="logo-entry-text">{item.focus}</p>
              </div>
            </article>
          ))}
        </div>
      </RevealSection>

      <RevealSection className="mt-16" delay={0.1}>
        <SectionHeading
          label="Creative Profile"
          title="Books, graphic designs, photographs, and achievements complete the wider creative profile."
          text="These sections show the interests and disciplines behind the frontend and software work."
        />
        <div className="category-columns mt-10">
          {collections.map((collection) => (
            <article key={collection.title} className="category-column">
              <h3 className="category-column-title">{collection.title}</h3>
              <div className="category-list">
                {collection.items.map((item) => (
                  <div key={item.title} className="category-line">
                    <p className="category-line-title">{item.title}</p>
                    <p className="category-line-text">{item.note}</p>
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
