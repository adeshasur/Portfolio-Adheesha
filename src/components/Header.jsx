import { NavLink, Link } from "react-router-dom";
import { navLinks } from "../data/siteData";

export default function Header() {
  return (
    <header className="page-frame pt-4 md:pt-6">
      <div className="site-nav-shell">
        <Link to="/" className="brand-link">
          Adheesha Sooriyaarachchi
        </Link>

        <nav className="nav-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/contact" className="header-cta">
          Let&apos;s Talk
        </Link>
      </div>
    </header>
  );
}
