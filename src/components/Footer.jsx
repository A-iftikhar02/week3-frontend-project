// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-grid">
        {/* Brand / About */}
        <section className="footer-card">
          <div className="footer-brand">
            <span className="footer-logo" aria-hidden />
            <strong>ShopX</strong>
          </div>

          {/* Updated, store-appropriate about line */}
          <p className="footer-text">
            ShopX is your one‑stop online store for the latest gadgets and
            electronics — great prices, fast shipping, and easy returns.
          </p>
          {/* Social icons removed from the About card as requested */}
        </section>

        {/* Quick Links */}
        <nav className="footer-card" aria-label="Quick links">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/shop" className="footer-link">Shop</Link></li>
            <li><Link to="/cart" className="footer-link">Cart</Link></li>
          </ul>
        </nav>

        {/* Contact */}
        <section className="footer-card">
          <h3 className="footer-title">Contact</h3>

          {/* Clickable mail link */}
          <p className="footer-text">
            <a
              href="mailto:hello@shopx.example"
              className="footer-link"
              aria-label="Email ShopX"
            >
              hello@shopx.example
            </a>
          </p>

          {/* Socials moved here (Facebook, Instagram, Twitter) */}
          <div className="socials" aria-label="Social links">
            {/* Facebook */}
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.19 8.44 10v-7.07H7.9V12.1h2.54V9.93c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.62.77-1.62 1.56v1.84h2.76l-.44 2.89h-2.32V22C18.34 21.25 22 17.08 22 12.06Z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5A5.5 5.5 0 1 0 17.5 13 5.5 5.5 0 0 0 12 7.5Zm0 9A3.5 3.5 0 1 1 15.5 13 3.5 3.5 0 0 1 12 16.5ZM18 6.25a1.25 1.25 0 1 0 1.25 1.25A1.25 1.25 0 0 0 18 6.25Z"/>
              </svg>
            </a>

            {/* Twitter/X */}
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              title="Twitter"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M22 5.75c-.77.34-1.6.57-2.46.68a4.25 4.25 0 0 0-7.25 3.88A12 12 0 0 1 3.16 4.63a4.24 4.24 0 0 0 1.32 5.67 4.2 4.2 0 0 1-1.93-.53v.05a4.25 4.25 0 0 0 3.41 4.17 4.26 4.26 0 0 1-1.92.07 4.26 4.26 0 0 0 3.97 2.95A8.52 8.52 0 0 1 2 18.39a12 12 0 0 0 6.49 1.9c7.79 0 12.06-6.45 12.06-12.04 0-.18 0-.36-.01-.54A8.6 8.6 0 0 0 22 5.75z"/>
              </svg>
            </a>
          </div>

          <div className="divider" />
          <p className="footer-small">
            © {new Date().getFullYear()} ShopX. All rights reserved.
          </p>
        </section>
      </div>
    </footer>
  );
}
