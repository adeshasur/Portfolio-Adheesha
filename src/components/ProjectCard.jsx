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
    <article
      className={`project-shell group flex h-full flex-col overflow-hidden ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div
        className={`project-preview ${featured ? "min-h-[340px] md:min-h-[420px]" : "min-h-[320px]"}`}
        style={{ background: project.accent }}
      >
        <div className="project-preview-grid" />
        <div className="project-preview-meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <div className="project-preview-mark">{initials}</div>
        <div className="project-preview-badge">{project.format}</div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 md:p-7">
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
          <span>{project.category}</span>
          <span className="h-1 w-1 rounded-full bg-zinc-300" />
          <span>{project.format}</span>
        </div>
        <h3 className="text-[clamp(1.9rem,3vw,2.8rem)] font-semibold tracking-[-0.05em] text-ink">
          {project.name}
        </h3>
        <p className="max-w-2xl text-[15px] leading-7 text-zinc-600">{project.blurb}</p>
        <a
          href={project.url}
          className="project-link mt-auto inline-flex items-center gap-2 text-sm font-semibold text-ink"
        >
          Open Project
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}
