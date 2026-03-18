import { useLocation } from "react-router-dom";
import LandingScrollLink from "./LandingScrollLink";
import { navLinks } from "../data/siteData";

export default function Header() {
  const location = useLocation();
  const activeHash = location.pathname === "/" ? location.hash || "#home" : "";

  return (
    <header className="page-frame sticky top-0 z-30 pt-4 md:pt-6">
      <div className="site-nav-shell">
        <LandingScrollLink href="/#home" className="text-[1.35rem] font-semibold tracking-[-0.05em] text-ink">
          Adheesha Sooriyaarachchi
        </LandingScrollLink>

        <nav className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
          {navLinks.map((link) => (
            <LandingScrollLink
              key={link.href}
              href={link.href}
              className={`nav-link ${activeHash === link.hash ? "text-ink" : ""}`}
            >
              {link.label}
            </LandingScrollLink>
          ))}
        </nav>

        <LandingScrollLink href="/#contact" className="header-cta">
          Let&apos;s Talk
        </LandingScrollLink>
      </div>
    </header>
  );
}
