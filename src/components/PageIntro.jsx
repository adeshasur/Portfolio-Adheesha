export default function PageIntro({ label, title, text, sideNote }) {
  return (
    <section className="page-intro-shell px-6 py-8 md:px-8 md:py-10">
      <div className="grid gap-8 xl:grid-cols-[1.02fr_0.98fr] xl:items-end">
        <div>
          <span className="section-chip">{label}</span>
          <h1 className="page-intro-title mt-6">{title}</h1>
          <p className="mt-5 max-w-[640px] text-[17px] leading-8 text-zinc-600">{text}</p>
        </div>
        {sideNote ? <div className="page-intro-note">{sideNote}</div> : null}
      </div>
    </section>
  );
}
