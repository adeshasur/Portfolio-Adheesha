export default function SectionHeading({ label, title, text, align = "left" }) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <span className="section-chip">{label}</span>
      <h2 className="subheadline-balance mt-5 font-extrabold text-ink">{title}</h2>
      {text ? <p className="mt-4 text-base leading-8 text-zinc-600">{text}</p> : null}
    </div>
  );
}
