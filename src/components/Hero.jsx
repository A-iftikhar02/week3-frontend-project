// src/components/Hero.jsx
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      className="hero-banner"
      aria-labelledby="hero-heading"
      aria-describedby="hero-desc hero-art-desc"
      role="region"
    >
      {/* Visually hidden description for the decorative background */}
      <p id="hero-art-desc" className="sr-only">
        Promotional banner featuring electronics and accessories.
      </p>

      <div className="hero-content">
        <span className="hero-badge" aria-hidden="true">Limited Time</span>

        <h1 id="hero-heading">Upgrade Your Everyday Tech</h1>

        <p id="hero-desc">
          Save on headphones, smartwatches, and more. Free shipping on all orders.
        </p>

        <div className="hero-buttons" style={{ marginTop: 12 }}>
          <Link
            to="/shop"
            className="btn primary"
            aria-label="Shop the collection now"
          >
            Shop Now
          </Link>

          <a
            href="#featured-heading"
            className="btn secondary"
            aria-label="Jump to featured products"
          >
            Featured
          </a>
        </div>
      </div>
    </section>
  );
}
