export default function PageIntro({ label, title, text, sideNote }) {
  return (
    <section className="page-intro">
      <div className="page-intro-grid">
        <div className="page-intro-main">
          <span className="section-chip">{label}</span>
          <h1 className="page-intro-title mt-6">{title}</h1>
        </div>
        <div className="page-intro-side">
          <p className="page-intro-text">{text}</p>
          {sideNote ? <p className="page-intro-note">{sideNote}</p> : null}
        </div>
      </div>
    </section>
  );
}
