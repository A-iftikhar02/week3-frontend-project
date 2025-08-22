// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import RatingStars from "./RatingStars";
import { useCart } from "../store/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  // Support string path or {src, alt} object
  const first = Array.isArray(product.images) ? product.images[0] : null;
  const imgSrc = typeof first === "string" ? first : first?.src;
  const imgAlt =
    (typeof first === "object" && first?.alt) ||
    `${product.title} product image`;

  const titleId = `prod-title-${product.id}`;

  const handleAdd = (e) => {
    // avoid triggering the Link when button sits inside a clickable card area
    e.stopPropagation?.();
    e.preventDefault?.();
    addToCart(product, 1);
  };

  return (
    <article className="card" aria-labelledby={titleId}>
      <Link
        to={`/product/${product.id}`}
        className="image-wrap"
        aria-label={`View ${product.title}`}
      >
        {product.category && <span className="badge">{product.category}</span>}
        <img
          src={imgSrc || "/images/placeholder-1.svg"}
          alt={imgAlt}
          loading="lazy"
          decoding="async"
        />
      </Link>

      <div className="content">
        <h3 id={titleId} style={{ margin: 0 }}>
          <Link
            to={`/product/${product.id}`}
            className="title"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {product.title}
          </Link>
        </h3>

        <RatingStars
          rating={product.rating}
          count={product.ratingCount}
          size={16}
          compact
        />

        <div className="price">{formatPrice(product.price)}</div>

        <button
          type="button"
          className="btn"
          onClick={handleAdd}
          aria-label={`Add ${product.title} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
