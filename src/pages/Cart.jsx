// src/pages/Cart.jsx
import { Link } from "react-router-dom";
import { useCart } from "../store/CartContext";
import { formatPrice } from "../utils/formatPrice";
import QuantitySelector from "../components/QuantitySelector";

export default function Cart() {
  const { items, increment, decrement, remove, subtotal } = useCart();

  const isEmpty = !Array.isArray(items) || items.length === 0;

  // Safely update quantity by diffing current vs next and calling inc/dec accordingly
  const updateQty = (line, nextValue) => {
    const current = Number(line.qty) || 1;
    const next = Math.max(1, Math.min(99, Number(nextValue) || 1)); // clamp and ignore NaN

    if (next === current) return;
    const diff = next - current;
    if (diff > 0) {
      for (let i = 0; i < diff; i++) increment(line.id);
    } else {
      for (let i = 0; i < Math.abs(diff); i++) decrement(line.id);
    }
  };

  if (isEmpty) {
    return (
      <section className="container">
        <h1>Your Cart</h1>
        <div className="empty-state" role="status" aria-live="polite">
          <h2>Your cart is empty</h2>
          <p>Looks like you haven’t added anything yet.</p>
          <Link to="/shop" className="btn" aria-label="Start shopping">
            Start shopping →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
      <div style={{ overflowX: "auto" }}>
        <table className="cart-table" role="table">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Price</th>
              <th scope="col">Qty</th>
              <th scope="col">Total</th>
              <th scope="col" aria-label="Actions"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((line) => {
              const imgSrc = line.image || "/images/placeholder-1.svg";
              const lineTotal = (line.price || 0) * (line.qty || 1);
              return (
                <tr key={line.id}>
                  <td>
                    <div className="cart-line">
                      <img
                        className="cart-thumb"
                        src={imgSrc}
                        alt={line.title ? `${line.title} thumbnail` : "Product thumbnail"}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.src = "/images/placeholder-1.svg";
                        }}
                      />
                      <div>{line.title || "Product"}</div>
                    </div>
                  </td>

                  <td>{formatPrice(line.price)}</td>

                  <td>
                    <QuantitySelector
                      value={line.qty}
                      min={1}
                      max={99}
                      onChange={(v) => updateQty(line, v)}
                      inputId={`qty-${line.id}`}
                      label="Quantity"
                    />
                  </td>

                  <td>{formatPrice(lineTotal)}</td>

                  <td>
                    <button
                      className="btn outline"
                      onClick={() => remove(line.id)}
                      aria-label={`Remove ${line.title || "item"} from cart`}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <aside className="totals" aria-label="Order summary">
        <div className="row">
          <span>Subtotal</span>
          <strong>{formatPrice(subtotal)}</strong>
        </div>
        <div className="row muted">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="row grand">
          <span>Grand Total</span>
          <strong>{formatPrice(subtotal)}</strong>
        </div>
        <Link
          to="/checkout"
          className="btn"
          style={{ display: "block", textAlign: "center", marginTop: 10 }}
          aria-label="Proceed to checkout"
        >
          Proceed to Checkout
        </Link>
      </aside>
    </section>
  );
}
