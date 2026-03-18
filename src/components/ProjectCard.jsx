export default function ProjectCard({ project, featured = false }) {
  return (
    <article
      className={`glass-card tilt-card flex h-full flex-col gap-4 p-6 ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <span className="section-chip w-fit">Live Project</span>
      <h3 className="text-2xl font-extrabold tracking-[-0.04em] text-ink">
        {project.name}
      </h3>
      <p className="text-sm leading-7 text-zinc-600">{project.blurb}</p>
      <a
        href={project.url}
        className="mt-auto inline-flex min-h-11 items-center justify-center bg-black/90 px-4 text-sm font-extrabold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-800"
      >
        Open Project
      </a>
    </article>
  );
}

