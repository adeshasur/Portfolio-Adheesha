import { useLocation } from "react-router-dom";
import LandingScrollLink from "./LandingScrollLink";
import { navLinks } from "../data/siteData";

export default function Header() {
  const location = useLocation();
  const activeHash = location.pathname === "/" ? location.hash || "#home" : "";

  return (
    <header className="page-frame sticky top-0 z-30 pt-4 md:pt-6">
      <div className="glass-panel border-0 bg-white/55 shadow-glass backdrop-blur-2xl">
        <div className="flex flex-col gap-5 px-5 py-4 md:px-7 md:py-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <LandingScrollLink
              href="/#home"
              className="text-lg font-extrabold tracking-[-0.04em]"
            >
              Adheesha Sooriyaarachchi
            </LandingScrollLink>
            <LandingScrollLink
              href="/#contact"
              className="inline-flex min-h-12 items-center justify-center bg-zinc-950 px-5 text-sm font-extrabold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 md:min-h-11"
            >
              Let&apos;s Talk
            </LandingScrollLink>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-3 pt-1 md:gap-5">
            {navLinks.map((link) => (
              <LandingScrollLink
                key={link.href}
                href={link.href}
                className={`nav-link ${activeHash === link.hash ? "text-gold" : ""}`}
              >
                {link.label}
              </LandingScrollLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
