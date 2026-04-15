"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { toolkitGroups, toolkitItems } from "../../lib/site-data";

const toolGroupMap = new Map(
  toolkitGroups.flatMap((group) => group.items.map((item) => [item.name, group])),
);

const toolCards = toolkitItems.map((item) => {
  const group = toolGroupMap.get(item.name);

  return {
    ...item,
    groupId: group?.id || "all",
    groupTitle: group?.title || "Toolkit",
    tags: [item.category, group?.eyebrow || "Published Tool", item.shortCode],
  };
});

const categoryFilters = [
  { id: "all", label: "All Tools", count: toolCards.length },
  ...toolkitGroups.map((group) => ({
    id: group.id,
    label: group.title,
    count: group.items.length,
  })),
];

function ToolsHero({ totalTools, query, setQuery, activeFilter, setActiveFilter }) {
  return (
    <section className="relative overflow-hidden rounded-[42px] px-6 py-10 md:px-10 md:py-12">
      <div className="absolute inset-0 rounded-[42px] bg-gradient-to-br from-white/76 via-white/48 to-amber-50/55" />
      <div
        className="tools-grid-animated absolute inset-0 rounded-[42px] opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(209, 213, 219, 0.24) 1px, transparent 1px), linear-gradient(90deg, rgba(209, 213, 219, 0.24) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div className="absolute left-[-4%] top-10 h-72 w-72 rounded-full bg-white/75 blur-3xl" />
      <div className="absolute right-[6%] top-20 h-64 w-64 rounded-full bg-gold/14 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold glass-soft">
          <Sparkles className="h-3.5 w-3.5" />
          Tools
          <span className="rounded-full bg-[#fff4e6] px-2 py-0.5 text-[10px] text-[#b7791f]">{totalTools} available</span>
        </span>

        <h1 className="font-display mt-6 text-[clamp(2.8rem,6vw,5rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-ink">
          Tools
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-8 text-zinc-600 md:text-[16px]">
          Essential productivity tools, converters, generators, and utilities arranged in a cleaner browsing experience.
        </p>

        <div className="mx-auto mt-8 max-w-2xl rounded-full border border-white/55 bg-white/78 px-5 py-4 shadow-[0_18px_46px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <label className="flex items-center gap-3">
            <Search className="h-5 w-5 text-zinc-400" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tools by name, category, or tags..."
              className="w-full border-0 bg-transparent text-[15px] text-ink outline-none placeholder:text-zinc-400"
            />
          </label>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {categoryFilters.map((filter) => {
            const active = filter.id === activeFilter;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-full px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition ${
                  active
                    ? "bg-ink text-white shadow-[0_16px_34px_rgba(15,23,42,0.18)]"
                    : "bg-white/72 text-zinc-600 glass-soft hover:bg-white/90 hover:text-ink"
                }`}
              >
                {filter.label}
                <span className={`ml-2 rounded-full px-2 py-0.5 text-[10px] ${active ? "bg-white/14 text-white" : "bg-zinc-100 text-zinc-500"}`}>
                  {filter.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ToolCard({ item, index }) {
  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-[28px] p-4 md:p-5"
      style={{
        backgroundImage: `linear-gradient(165deg, rgba(255,255,255,0.82), rgba(255,255,255,0.58)), ${item.accent}`,
        boxShadow: `0 20px 48px ${item.glow}`,
      }}
    >
      <div className="noise-mask opacity-30" />
      <div className="absolute inset-[1px] rounded-[27px] bg-white/70" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-white/86 shadow-[0_14px_30px_rgba(15,23,42,0.08)]">
            <span className="font-display text-[1rem] font-semibold tracking-[-0.05em] text-ink">{item.shortCode}</span>
          </div>
          <span className="rounded-full bg-white/74 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 glass-soft">
            {item.groupTitle}
          </span>
        </div>

        <h2 className="font-display mt-6 text-[1.35rem] font-semibold leading-[1.08] tracking-[-0.06em] text-ink">
          {item.name}
        </h2>
        <p className="mt-3 text-[14px] leading-7 text-zinc-600">
          {item.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-white/72 px-3 py-1 text-[11px] font-medium text-zinc-700 glass-soft">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink/80">
          Open Tool
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.a>
  );
}

export default function ToolsPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return toolCards.filter((item) => {
      const matchesFilter = activeFilter === "all" || item.groupId === activeFilter;
      const matchesQuery =
        !normalizedQuery ||
        [item.name, item.category, item.groupTitle, item.description, ...item.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, query]);

  return (
    <main className="relative overflow-hidden px-4 pb-20 pt-6 text-ink md:px-6 md:pb-24 md:pt-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8%] top-20 h-72 w-72 rounded-full bg-white/70 blur-3xl" />
        <div className="absolute right-[-6%] top-[18rem] h-[24rem] w-[24rem] rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute left-[10%] top-[70rem] h-80 w-80 rounded-full bg-sky-100/45 blur-3xl" />
        <div className="absolute right-[10%] bottom-10 h-[18rem] w-[18rem] rounded-full bg-amber-100/35 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1380px]">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[32px] border border-white/45 bg-white/52 px-5 py-4 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:px-6">
          <a href="/" className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-ink glass-soft">
            <ArrowLeft className="h-4 w-4" />
            Back Home
          </a>
          <div className="text-right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">Portfolio Tools</p>
            <p className="font-display text-lg font-semibold tracking-[-0.04em] text-ink">Adheesha Toolkit</p>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <ToolsHero
            totalTools={toolCards.length}
            query={query}
            setQuery={setQuery}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />

          <section className="rounded-[42px] px-1 py-2 md:px-2">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 px-2 md:px-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">Filtered Results</p>
                <h2 className="font-display mt-2 text-[1.6rem] font-semibold tracking-[-0.05em] text-ink md:text-[1.9rem]">
                  {filteredTools.length} tools ready to open
                </h2>
              </div>
              <p className="max-w-xl text-[14px] leading-7 text-zinc-600">
                Explore by category or search directly. Every card opens the published tool in a new tab.
              </p>
            </div>

            {filteredTools.length ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {filteredTools.map((item, index) => (
                  <ToolCard key={item.name} item={item} index={index} />
                ))}
              </div>
            ) : (
              <div className="rounded-[32px] bg-white/55 px-6 py-12 text-center glass-soft">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">No Match Found</p>
                <h3 className="font-display mt-4 text-2xl font-semibold tracking-[-0.05em] text-ink">Try another tool name or category.</h3>
                <p className="mt-3 text-[15px] leading-7 text-zinc-600">
                  Clear the search or switch the category filter to see the full toolkit again.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}


