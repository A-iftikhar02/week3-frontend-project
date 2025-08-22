// src/pages/Product.jsx
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { REVIEWS } from "../data/reviews";       // ⬅️ NEW
import Gallery from "../components/Gallery";
import RatingStars from "../components/RatingStars";
import QuantitySelector from "../components/QuantitySelector";
import Reviews from "../components/Reviews";     // ⬅️ NEW
import { useCart } from "../store/CartContext";
import { formatPrice } from "../utils/formatPrice";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const product = useMemo(() => PRODUCTS.find(p => p.id === id), [id]);

  if (!product) {
    return (
      <section className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link> <span aria-hidden="true">/</span>{" "}
          <Link to="/shop">Shop</Link> <span aria-hidden="true">/</span>{" "}
          <span>Not found</span>
        </nav>
        <h1>Product not found</h1>
        <p className="product-desc">The product you’re looking for doesn’t exist.</p>
        <Link to="/shop" className="btn">Back to Shop</Link>
      </section>
    );
  }

  // Normalize images to string array for Gallery
  const galleryImages = (product.images || []).map(img =>
    typeof img === "string" ? img : img.src
  );

  const handleAdd = () => addToCart(product, qty);

  // Pull dummy reviews for this product (or fall back)
  const reviews = REVIEWS[product.id] ?? REVIEWS.default; // ⬅️ NEW

  return (
    <section className="container">
      {/* Breadcrumbs */}
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link> <span aria-hidden="true">/</span>{" "}
        <Link to="/shop">Shop</Link> <span aria-hidden="true">/</span>{" "}
        <span>{product.title}</span>
      </nav>

      <div className="product-grid">
        {/* Media / Gallery */}
        <div className="product-media">
          <div className="gallery-hero">
            <Gallery images={galleryImages} />
          </div>
        </div>

        {/* Details */}
        <div className="product-details">
          {product.category && <span className="pill">{product.category}</span>}
          <h1 className="product-title" style={{ marginTop: 6 }}>{product.title}</h1>

          <div className="product-meta" style={{ marginBottom: 8 }}>
            {/* Pass count to stars so it can render compactly if you choose */}
            <RatingStars rating={product.rating ?? 0} count={product.ratingCount} />
            {typeof product.ratingCount === "number" && product.ratingCount > 0 && (
              <span className="rating-count">({product.ratingCount} reviews)</span>
            )}
            <span className="dot">•</span>
            <span style={{ color: "var(--muted)" }}>In stock</span>
          </div>

          <div className="product-price">{formatPrice(product.price)}</div>
          <p className="product-desc">{product.description}</p>

          {/* Optional feature bullets (e.g., Smartwatch Pro X) */}
          {Array.isArray(product.features) && product.features.length > 0 && (
            <>
              <h3 style={{ marginTop: 12 }}>Highlights</h3>
              <ul className="feature-list">
                {product.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </>
          )}

          {/* Quantity + actions */}
          <div className="product-actions">
            <div>
              <div className="qty-row" role="group" aria-label="Choose quantity">
                <QuantitySelector value={qty} onChange={setQty} min={1} />
              </div>
              <div className="qty-hint">Min 1 · Max 99</div>
            </div>

            <button
              className="btn"
              onClick={handleAdd}
              aria-label={`Add ${qty} ${product.title} to cart`}
            >
              Add to Cart
            </button>

            {/* “Back to Shop” for quick navigation */}
            <button
              type="button"
              className="btn outline"
              onClick={() => navigate("/shop")}
            >
              ← Back to Shop
            </button>

            {/* Optional: Buy Now shortcut */}
            <Link
              to="/checkout"
              className="btn outline"
              onClick={() => addToCart(product, qty)}
              aria-label="Buy now"
            >
              Buy Now
            </Link>
          </div>

          {/* Brief callout for the example product from the brief */}
          {product.id === "p002" && (
            <div className="footer-card" style={{ marginTop: 12 }}>
              <h3 className="footer-title">Why Smartwatch Pro X?</h3>
              <p className="footer-text">
                Fitness tracking, waterproof design, and a 7‑day battery — all for just $129.99.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Reviews / Testimonials */}
      <div style={{ marginTop: 28 }}>
        <Reviews reviews={reviews} />
      </div>
    </section>
  );
}
