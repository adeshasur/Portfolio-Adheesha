import React from 'react'
import VaultGuard from './components/VaultGuard'
import './App.css'

const shell = {
  eyebrow: 'Security Utility',
  title: 'Vault Guard',
  description: 'Alternate Vault Guard build ekath same portfolio design direction ekata bind kala so tool family eka consistent wenna.',
  accent: 'Secure and clean',
}

function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f6f1e6] text-slate-950 selection:bg-amber-200 selection:text-slate-950">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-6%] top-12 h-72 w-72 rounded-full bg-white/70 blur-3xl" />
        <div className="absolute right-[-6%] top-[18rem] h-[24rem] w-[24rem] rounded-full bg-amber-200/35 blur-3xl" />
        <div className="absolute left-[14%] top-[34rem] h-80 w-80 rounded-full bg-sky-100/45 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#d6c7a91f_1px,transparent_1px),linear-gradient(to_bottom,#d6c7a91f_1px,transparent_1px)] bg-[size:18px_18px] opacity-60" />
      </div>

      <header className="relative z-20 px-4 pt-4 md:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-white/50 bg-white/62 px-4 py-3 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:px-6">
          <a href="https://info-adheesha.vercel.app" className="font-display text-sm font-semibold tracking-[-0.03em] text-slate-900 md:text-base">
            Adheesha Sooriyaarachchi
          </a>
          <div className="hidden rounded-full bg-white/72 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-700 md:inline-flex">
            {shell.eyebrow}
          </div>
          <a
            href="https://info-adheesha.vercel.app/#toolkit"
            className="inline-flex rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/10"
          >
            Back to Portfolio
          </a>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex max-w-7xl flex-col px-4 pb-10 pt-8 md:px-6 md:pb-14 md:pt-10">
        <section className="grid gap-8 rounded-[38px] bg-white/26 px-2 py-2 md:grid-cols-[0.94fr_1.06fr] md:items-end md:px-4 md:py-4">
          <div className="rounded-[34px] bg-white/48 p-6 shadow-[0_20px_55px_rgba(15,23,42,0.06)] backdrop-blur-2xl md:p-8">
            <span className="inline-flex rounded-full bg-white/72 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700">
              {shell.eyebrow}
            </span>
            <h1 className="font-display mt-5 max-w-xl text-balance text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-slate-950">
              {shell.title}
            </h1>
            <p className="mt-4 max-w-xl text-[14px] leading-7 text-slate-600 md:text-[15px]">
              {shell.description}
            </p>
          </div>

          <div className="rounded-[34px] bg-white/48 p-6 shadow-[0_20px_55px_rgba(15,23,42,0.06)] backdrop-blur-2xl md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">Tool Identity</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[24px] bg-white/72 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Visual Base</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">Light glass surfaces, warm gold glow, and cleaner workspace framing.</p>
              </div>
              <div className="rounded-[24px] bg-white/72 px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Focus</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">Secure and clean</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[38px] border border-white/50 bg-white/52 p-3 shadow-[0_22px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:p-4">
          <VaultGuard embedded={true} />
        </section>
      </main>
    </div>
  )
}

export default App
