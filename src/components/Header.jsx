import { Link, NavLink } from "react-router-dom";
import { navLinks } from "../data/siteData";

export default function Header() {
  return (
    <header className="page-frame pt-4 md:pt-6">
      <div className="glass-panel">
        <div className="flex flex-col gap-5 px-5 py-4 md:px-7 md:py-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Link to="/" className="text-lg font-extrabold tracking-[-0.04em]">
              Adheesha Sooriyaarachchi
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-12 items-center justify-center border border-black/5 bg-zinc-950 px-5 text-sm font-extrabold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-800 md:min-h-11"
            >
              Let's Talk
            </Link>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-3 border-t border-black/5 pt-4 md:gap-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "text-gold" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
