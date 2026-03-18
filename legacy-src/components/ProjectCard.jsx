function initialsFromName(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

export default function ProjectCard({ project, featured = false }) {
  const initials = initialsFromName(project.name);

  return (
    <article className={`project-row ${featured ? "project-row-featured" : ""}`}>
      <div className="project-row-visual" style={{ background: project.accent }}>
        <div className="project-preview-grid" />
        <div className="project-preview-meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <div className="project-preview-mark">{initials}</div>
        <div className="project-preview-chip">{project.format}</div>
      </div>

      <div className="project-row-copy">
        <p className="project-row-kicker">
          {project.category} · {project.format}
        </p>
        <h3 className="project-row-title">{project.name}</h3>
        <p className="project-row-text">{project.blurb}</p>
        <a href={project.url} className="project-link mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ink">
          Open Project <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}
