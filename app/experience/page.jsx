"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness } from "lucide-react";
import { experienceItems } from "../../lib/site-data";

function ExperienceCard({ item, index }) {
  return (
    <motion.a
      href={item.href}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-[34px] bg-white/62 p-6 glass-soft md:p-8"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/20 to-gold/10" />
      <div className="absolute -right-8 top-8 h-28 w-28 rounded-full bg-gold/12 blur-3xl transition duration-500 group-hover:scale-125" />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Working Experience</p>
            <h2 className="font-display mt-3 text-[2rem] font-semibold tracking-[-0.06em] text-ink md:text-[2.35rem]">{item.title}</h2>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">{item.subtitle}</p>
          </div>
          <div className="flex h-24 min-w-24 items-center justify-center rounded-[24px] bg-white/90 px-5 shadow-[0_20px_40px_rgba(15,23,42,0.08)] md:h-28 md:min-w-28">
            <Image src={item.image} alt={item.title} className="h-14 w-auto object-contain md:h-[4.5rem]" />
          </div>
        </div>
        <p className="mt-6 max-w-2xl text-[15px] leading-8 text-zinc-600 md:text-[16px]">{item.body}</p>
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink">
          Visit Link <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </motion.a>
  );
}

export default function ExperiencePage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 pb-20 pt-4 text-ink md:px-6 md:pb-28 md:pt-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8%] top-20 h-72 w-72 rounded-full bg-white/70 blur-3xl" />
        <div className="absolute right-[-6%] top-[12rem] h-[24rem] w-[24rem] rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute left-[18%] bottom-[14rem] h-72 w-72 rounded-full bg-sky-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1380px]">
        <header className="sticky top-4 z-50 rounded-full border border-white/45 bg-white/52 px-4 py-3 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:px-6">
          <div className="flex items-center justify-between gap-4">
            <a href="/" className="font-display text-sm font-semibold tracking-[-0.03em] text-ink md:text-base">
              Adheesha Sooriyaarachchi
            </a>
            <div className="flex items-center gap-3">
              <a href="/" className="inline-flex items-center gap-2 rounded-full bg-white/75 px-4 py-2.5 text-sm font-semibold text-zinc-700 glass-soft">
                <ArrowLeft className="h-4 w-4" />
                Back Home
              </a>
              <a href="#experience-list" className="hidden rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 md:inline-flex">
                View Experience
              </a>
            </div>
          </div>
        </header>

        <section className="relative overflow-hidden rounded-[42px] px-6 pb-10 pt-10 md:px-10 md:pb-12 md:pt-12">
          <div className="absolute inset-0 rounded-[42px] bg-gradient-to-br from-white/78 via-white/52 to-gold/10" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-3 rounded-full bg-white/64 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-700 glass-soft">
                <BriefcaseBusiness className="h-4 w-4 text-gold" />
                Working Experience
              </span>
              <h1 className="font-display mt-6 text-[clamp(2.8rem,6vw,5.2rem)] font-semibold leading-[0.9] tracking-[-0.08em] text-ink">
                Focused space for the brands and teams behind the work.
              </h1>
              <p className="mt-6 max-w-2xl text-[15px] leading-8 text-zinc-600 md:text-[17px]">
                This page gives working experience its own breathing room, with clearer logos, stronger presentation, and space to expand the details later.
              </p>
            </div>
            <div className="rounded-[32px] bg-white/60 p-6 glass-soft md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Preview</p>
              <div className="mt-5 grid grid-cols-2 gap-4">
                {experienceItems.map((item) => (
                  <div key={item.title} className="rounded-[24px] bg-white/88 p-4 shadow-[0_18px_35px_rgba(15,23,42,0.06)]">
                    <div className="flex h-20 items-center justify-center rounded-[18px] bg-white md:h-24">
                      <Image src={item.image} alt={item.title} className="h-12 w-auto object-contain md:h-14" />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-zinc-700">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experience-list" className="pt-20 md:pt-24">
          <div className="grid gap-5">
            {experienceItems.map((item, index) => (
              <ExperienceCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

