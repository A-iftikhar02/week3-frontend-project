// src/pages/Checkout.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../store/CartContext";
import { formatPrice } from "../utils/formatPrice";
import Toast from "../components/Toast"; // ✅ import the toast

const initial = {
  fullName: "",
  email: "",
  address: "",
  city: "",
  zip: "",
  country: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [attempted, setAttempted] = useState(false);

  // success + toast
  const [success, setSuccess] = useState(false);
  const [paidTotal, setPaidTotal] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [toast, setToast] = useState(null);

  const isEmpty = !Array.isArray(items) || items.length === 0;
  const total = useMemo(() => subtotal, [subtotal]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!values.fullName.trim()) er.fullName = "Full name is required.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) er.email = "Enter a valid email.";

    if (!values.address.trim()) er.address = "Address is required.";
    if (!values.city.trim()) er.city = "City is required.";
    if (!/^\d{4,10}$/.test(values.zip)) er.zip = "Enter a valid ZIP / postal code.";
    if (!values.country.trim()) er.country = "Country is required.";

    const digits = values.cardNumber.replace(/\s+/g, "");
    if (!/^\d{13,19}$/.test(digits)) er.cardNumber = "Enter a valid card number (digits only).";
    if (!values.cardName.trim()) er.cardName = "Name on card is required.";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(values.expiry)) er.expiry = "Use MM/YY format.";
    if (!/^\d{3,4}$/.test(values.cvv)) er.cvv = "3–4 digit CVV.";

    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setAttempted(true);
    if (!validate()) return;

    // Fake order placement
    setPaidTotal(total);
    setOrderId(`ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
    clear();
    setSuccess(true);
    setToast("✅ Order placed successfully!");
  };

  // Success screen
  if (success) {
    return (
      <section className="container">
        <h1>✅ Order Placed Successfully!</h1>
        <p className="product-desc">Thank you for your purchase. We’ve received your order.</p>

        <div className="footer-card" style={{ marginTop: 12 }}>
          <h3 className="footer-title">Order Summary</h3>
          <p className="footer-text">
            <strong>Order ID:</strong> {orderId}<br />
            <strong>Amount Paid:</strong> {paidTotal !== null ? formatPrice(paidTotal) : formatPrice(0)}
          </p>
        </div>

        <Link to="/shop" className="btn" style={{ marginTop: 14 }}>
          Continue Shopping →
        </Link>

        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </section>
    );
  }

  // Empty cart state
  if (isEmpty) {
    return (
      <section className="container">
        <h1>Checkout</h1>
        <div className="empty-state" role="status" aria-live="polite">
          <h2>Your cart is empty</h2>
          <p>Add some items to continue.</p>
          <Link to="/shop" className="btn">Back to Shop</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container" style={{ display: "grid", gap: 18 }}>
      <h1>Checkout</h1>

      <div style={{ display: "grid", gap: 18, gridTemplateColumns: "1fr", alignItems: "start" }}>
        {/* Form */}
        <form onSubmit={onSubmit} noValidate aria-labelledby="checkout-form">
          <h2 id="checkout-form">Billing & Payment</h2>

          {/* Contact */}
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="field">
              <label className="ff-label" htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                className="ff-input"
                value={values.fullName}
                onChange={onChange}
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? "err-fullName" : undefined}
                autoComplete="name"
                required
              />
              {errors.fullName && <p id="err-fullName" className="error">{errors.fullName}</p>}
            </div>

            <div className="field">
              <label className="ff-label" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                className="ff-input"
                value={values.email}
                onChange={onChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "err-email" : undefined}
                type="email"
                autoComplete="email"
                required
              />
              {errors.email && <p id="err-email" className="error">{errors.email}</p>}
            </div>
          </div>

          {/* Address */}
          <div className="field" style={{ marginTop: 8 }}>
            <label className="ff-label" htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              className="ff-input"
              value={values.address}
              onChange={onChange}
              aria-invalid={!!errors.address}
              aria-describedby={errors.address ? "err-address" : undefined}
              autoComplete="address-line1"
              required
            />
            {errors.address && <p id="err-address" className="error">{errors.address}</p>}
          </div>

          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div className="field">
              <label className="ff-label" htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                className="ff-input"
                value={values.city}
                onChange={onChange}
                aria-invalid={!!errors.city}
                aria-describedby={errors.city ? "err-city" : undefined}
                autoComplete="address-level2"
                required
              />
              {errors.city && <p id="err-city" className="error">{errors.city}</p>}
            </div>

            <div className="field">
              <label className="ff-label" htmlFor="zip">ZIP / Postal</label>
              <input
                id="zip"
                name="zip"
                className="ff-input"
                value={values.zip}
                onChange={onChange}
                aria-invalid={!!errors.zip}
                aria-describedby={errors.zip ? "err-zip" : undefined}
                autoComplete="postal-code"
                required
              />
              {errors.zip && <p id="err-zip" className="error">{errors.zip}</p>}
            </div>

            <div className="field">
              <label className="ff-label" htmlFor="country">Country</label>
              <input
                id="country"
                name="country"
                className="ff-input"
                value={values.country}
                onChange={onChange}
                aria-invalid={!!errors.country}
                aria-describedby={errors.country ? "err-country" : undefined}
                autoComplete="country-name"
                required
              />
              {errors.country && <p id="err-country" className="error">{errors.country}</p>}
            </div>
          </div>

          {/* Payment */}
          <h3 style={{ marginTop: 14 }}>Payment</h3>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="field">
              <label className="ff-label" htmlFor="cardName">Name on Card</label>
              <input
                id="cardName"
                name="cardName"
                className="ff-input"
                value={values.cardName}
                onChange={onChange}
                aria-invalid={!!errors.cardName}
                aria-describedby={errors.cardName ? "err-cardName" : undefined}
                autoComplete="cc-name"
                required
              />
              {errors.cardName && <p id="err-cardName" className="error">{errors.cardName}</p>}
            </div>

            <div className="field">
              <label className="ff-label" htmlFor="cardNumber">Card Number</label>
              <input
                id="cardNumber"
                name="cardNumber"
                className="ff-input"
                value={values.cardNumber}
                onChange={onChange}
                inputMode="numeric"
                aria-invalid={!!errors.cardNumber}
                aria-describedby={errors.cardNumber ? "err-cardNumber" : undefined}
                autoComplete="cc-number"
                placeholder="4242 4242 4242 4242"
                required
              />
              {errors.cardNumber && <p id="err-cardNumber" className="error">{errors.cardNumber}</p>}
            </div>
          </div>

          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="field">
              <label className="ff-label" htmlFor="expiry">Expiry (MM/YY)</label>
              <input
                id="expiry"
                name="expiry"
                className="ff-input"
                value={values.expiry}
                onChange={onChange}
                placeholder="07/28"
                aria-invalid={!!errors.expiry}
                aria-describedby={errors.expiry ? "err-expiry" : undefined}
                autoComplete="cc-exp"
                required
              />
              {errors.expiry && <p id="err-expiry" className="error">{errors.expiry}</p>}
            </div>

            <div className="field">
              <label className="ff-label" htmlFor="cvv">CVV</label>
              <input
                id="cvv"
                name="cvv"
                className="ff-input"
                value={values.cvv}
                onChange={onChange}
                inputMode="numeric"
                aria-invalid={!!errors.cvv}
                aria-describedby={errors.cvv ? "err-cvv" : undefined}
                autoComplete="cc-csc"
                required
              />
              {errors.cvv && <p id="err-cvv" className="error">{errors.cvv}</p>}
            </div>
          </div>

          <div style={{ marginTop: 14, display: "flex", gap: 12, alignItems: "center" }}>
            <button type="submit" className="btn" aria-label="Place order">
              Place Order
            </button>
            <Link to="/cart" className="btn outline" aria-label="Back to cart">
              Back to Cart
            </Link>
          </div>

          {/* global form announcement (a11y) */}
          <div aria-live="polite" style={{ height: 1, overflow: "hidden" }}>
            {attempted && Object.keys(errors).length > 0 ? "Please fix the highlighted fields." : ""}
          </div>
        </form>

        {/* Order summary */}
        <aside className="totals" aria-label="Order summary">
          <div className="row">
            <span>Subtotal</span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <div className="row muted">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="row grand">
            <span>Grand Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>
        </aside>
      </div>

      {/* toast lives at page level so it shows on both form & success screen */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </section>
  );
}
