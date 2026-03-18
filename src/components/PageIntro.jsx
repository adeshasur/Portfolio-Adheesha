export default function PageIntro({ label, title, text, sideNote }) {
  return (
    <section className="glass-panel px-6 py-8 md:px-10 md:py-12">
      <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
        <div>
          <span className="section-chip">{label}</span>
          <h1 className="subheadline-balance mt-5 font-extrabold text-ink">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-600">{text}</p>
        </div>
        {sideNote ? (
          <div className="glass-card p-6 text-sm leading-7 text-zinc-600">{sideNote}</div>
        ) : null}
      </div>
    </section>
  );
}
