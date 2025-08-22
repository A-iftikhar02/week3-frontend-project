// src/pages/About.jsx
export default function About() {
  return (
    <section className="container">
      <nav className="crumbs" aria-label="Breadcrumb">
        <a href="/">Home</a> <span aria-hidden="true">/</span> <span>About</span>
      </nav>

      <h1>About ShopX</h1>
      <p className="product-desc">
        ShopX is a modern storefront built with React + Vite. We focus on clean UI,
        accessibility, and a smooth shopping experience.
      </p>

      <div className="footer-card" style={{ marginTop: 16 }}>
        <h2 className="footer-title">Our Mission</h2>
        <p className="footer-text">
          Empower everyday shoppers with quality products at fair prices, delivered
          with great service and modern UX.
        </p>
      </div>

      <div
        className="grid"
        style={{ marginTop: 16, gridTemplateColumns: "1fr 1fr", gap: 14 }}
      >
        <div className="footer-card">
          <h3 className="footer-title">What we value</h3>
          <ul className="feature-list">
            <li>Clear, responsive design</li>
            <li>Accessible by default (labels, alt text, focus states)</li>
            <li>Fast performance with Vite</li>
            <li>Simple cart & checkout flow</li>
          </ul>
        </div>

        <div className="footer-card">
          <h3 className="footer-title">Tech stack</h3>
          <ul className="feature-list">
            <li>React + Vite</li>
            <li>React Router</li>
            <li>Context API for cart state</li>
            <li>Vanilla CSS with utility classes</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
