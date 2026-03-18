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
    <article className={`project-shell ${featured ? "md:col-span-2" : ""}`}>
      <div
        className={`project-preview ${featured ? "min-h-[340px] md:min-h-[420px]" : "min-h-[290px]"}`}
        style={{ background: project.accent }}
      >
        <div className="project-preview-grid" />
        <div className="project-preview-meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <div className="project-preview-mark">{initials}</div>
        <div className="project-preview-chip">{project.format}</div>
      </div>

      <div className="p-6 md:p-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          {project.category} · {project.format}
        </p>
        <h3 className="mt-4 text-[clamp(2rem,3vw,2.9rem)] font-semibold tracking-[-0.05em] text-ink">
          {project.name}
        </h3>
        <p className="mt-3 max-w-[58ch] text-[15px] leading-7 text-zinc-600">{project.blurb}</p>
        <a href={project.url} className="project-link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink">
          Open Project <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}
