import { Link } from "react-router-dom";
import { portrait, navLinks } from "../data/siteData";

export default function Footer() {
  return (
    <footer className="footer-band mt-20 md:mt-24">
      <section className="page-frame footer-shell">
        <div className="footer-grid">
          <div className="footer-portrait-pane">
            <div className="footer-portrait-glow" />
            <img
              src={portrait}
              alt="Adheesha Sooriyaarachchi portrait"
              className="footer-portrait-image"
            />
            <div className="footer-portrait-fade" />
          </div>

          <div className="footer-content">
            <span className="section-chip">Contact</span>
            <h2 className="footer-title">Book a call, and I&apos;ll take care of the rest.</h2>
            <p className="footer-copy">
              Portfolio websites, landing pages, and practical tools with cleaner visuals and stronger presentation.
            </p>

            <div className="footer-columns">
              <div>
                <p className="footer-label">Menu</p>
                <div className="footer-list">
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
                <div className="footer-list footer-meta">
                  <p>adheesha@example.com</p>
                  <p>Colombo, Sri Lanka</p>
                </div>
              </div>
              <div>
                <p className="footer-label">Focus</p>
                <div className="footer-list footer-meta">
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
