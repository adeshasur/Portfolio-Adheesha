import { Link } from "react-router-dom";
import { portrait, navLinks } from "../data/siteData";

export default function Footer() {
  return (
    <footer className="page-frame pb-8 pt-16 md:pb-12 md:pt-20">
      <section className="footer-shell overflow-hidden">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="relative min-h-[360px] overflow-hidden bg-zinc-900">
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-800" />
            <img
              src={portrait}
              alt="Adheesha Sooriyaarachchi portrait"
              className="absolute bottom-0 left-1/2 h-[110%] max-w-none -translate-x-1/2 object-contain opacity-95"
            />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-zinc-950 to-transparent" />
          </div>

          <div className="footer-content">
            <span className="section-chip">Contact</span>
            <h2 className="mt-5 max-w-[12ch] text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-white">
              Book a call, and I&apos;ll take care of the rest.
            </h2>
            <p className="mt-4 max-w-[480px] text-[15px] leading-7 text-zinc-400">
              Portfolio websites, landing pages, and practical tools with cleaner visuals and stronger presentation.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div>
                <p className="footer-label">Menu</p>
                <div className="mt-3 space-y-2">
                  <Link className="footer-link" to="/">Home</Link>
                  {navLinks.map((link) => (
                    <Link key={link.href} className="footer-link block" to={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="footer-label">Contact</p>
                <div className="mt-3 space-y-2 text-sm text-zinc-400">
                  <p>adheesha@example.com</p>
                  <p>Colombo, Sri Lanka</p>
                </div>
              </div>
              <div>
                <p className="footer-label">Focus</p>
                <div className="mt-3 space-y-2 text-sm text-zinc-400">
                  <p>Portfolio Design</p>
                  <p>React Frontend</p>
                  <p>Creative UI Direction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
