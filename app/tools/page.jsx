"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";
import { toolkitGroups } from "../../lib/site-data";

function ToolsIntro() {
  return (
    <div className="relative z-10 max-w-3xl">
      <span className="inline-flex items-center gap-2 rounded-full bg-white/55 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold glass-soft">
        <Sparkles className="h-3.5 w-3.5" />
        Tool Categories
      </span>
      <h1 className="font-display mt-5 text-balance text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-ink">
        A dedicated tools page with cleaner categories and direct tool access.
      </h1>
      <p className="mt-4 max-w-2xl text-[14px] leading-7 text-zinc-600 md:text-[15px]">
        This page keeps every published tool grouped by purpose, so the home page stays lighter while the full toolkit remains easy to explore.
      </p>
    </div>
  );
}

function ToolsCategoryCard({ group, index }) {
  return (
    <motion.section
      id={group.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-[32px] p-6 md:p-7"
      style={{
        backgroundImage: `linear-gradient(165deg, rgba(255,255,255,0.82), rgba(255,255,255,0.58)), ${group.accent}`,
        boxShadow: `0 22px 52px ${group.glow}`,
      }}
    >
      <div className="noise-mask opacity-35" />
      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex rounded-full bg-white/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600 glass-soft">
            {group.eyebrow}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            {group.items.length} Tools
          </span>
        </div>

        <h2 className="font-display mt-5 text-[1.7rem] font-semibold tracking-[-0.06em] text-ink md:text-[2rem]">
          {group.title}
        </h2>
        <p className="mt-3 max-w-2xl text-[14px] leading-7 text-zinc-600 md:text-[15px]">
          {group.description}
        </p>

        <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {group.items.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group/item relative overflow-hidden rounded-[24px] border border-white/45 bg-white/72 p-4 transition duration-300 hover:-translate-y-1"
              style={{
                backgroundImage: `linear-gradient(160deg, rgba(255,255,255,0.76), rgba(255,255,255,0.54)), ${item.accent}`,
              }}
            >
              <div className="relative z-10 flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] bg-white/84 shadow-[0_12px_24px_rgba(15,23,42,0.08)]">
                  <span className="font-display text-[0.9rem] font-semibold tracking-[-0.05em] text-ink">
                    {item.shortCode}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    {item.category}
                  </p>
                  <div className="mt-1 flex items-start justify-between gap-2">
                    <p className="font-display text-[1.05rem] font-semibold tracking-[-0.05em] text-ink">
                      {item.name}
                    </p>
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500 transition group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5" />
                  </div>
                  <p className="mt-2 text-[13px] leading-6 text-zinc-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default function ToolsPage() {
  return (
    <main className="relative overflow-hidden px-4 pb-20 pt-6 text-ink md:px-6 md:pb-24 md:pt-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8%] top-20 h-72 w-72 rounded-full bg-white/70 blur-3xl" />
        <div className="absolute right-[-6%] top-[18rem] h-[24rem] w-[24rem] rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute left-[10%] top-[70rem] h-80 w-80 rounded-full bg-sky-100/45 blur-3xl" />
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

        <div className="mt-8 rounded-[42px] px-6 py-8 md:px-10 md:py-10">
          <ToolsIntro />
          <div className="mt-10 space-y-5">
            {toolkitGroups.map((group, index) => (
              <ToolsCategoryCard key={group.id} group={group} index={index} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
