// src/pages/Home.jsx
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../data/products";
import Hero from "../components/Hero";

export default function Home() {
  // pick your featured logic (first 3 as you had)
  const featured = PRODUCTS.slice(0, 3);

  return (
    <section className="container" aria-labelledby="home-hero">
      {/* Banner / hero */}
      <Hero />

      {/* Featured products */}
      <section aria-labelledby="featured-heading" style={{ marginTop: 24 }}>
        <h2 id="featured-heading">Featured Products</h2>

        <div className="grid products">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* View All → /shop */}
        <div style={{ marginTop: 16 }}>
          <Link
            to="/shop"
            className="btn outline"
            aria-label="View all products in the shop"
          >
            View All →
          </Link>
        </div>
      </section>
    </section>
  );
}
