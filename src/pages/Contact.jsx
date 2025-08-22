// src/pages/Contact.jsx
import { useState } from "react";

const initial = { name: "", email: "", message: "" };

export default function Contact() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!values.name.trim()) er.name = "Your name is required.";
    if (!/^\S+@\S+\.\S+$/.test(values.email))
      er.email = "Enter a valid email address.";
    if (values.message.trim().length < 10)
      er.message = "Please enter at least 10 characters.";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Fake send
    setSent(true);
    setValues(initial);
  };

  return (
    <section className="container">
      <nav className="crumbs" aria-label="Breadcrumb">
        <a href="/">Home</a> <span aria-hidden="true">/</span> <span>Contact</span>
      </nav>

      <h1>Contact Us</h1>
      <p className="product-desc">
        Questions, feedback, or partnership ideas? Send us a note — we’d love to hear from you.
      </p>

      {/* Success notice */}
      {sent && (
        <div className="empty-state" role="status" aria-live="polite">
          <h2>Message sent ✅</h2>
          <p>Thanks! We’ll get back to you soon.</p>
        </div>
      )}

      <div
        className="grid"
        style={{ gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 8 }}
      >
        {/* Contact form */}
        <form onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor="name" className="ff-label">Name</label>
            <input
              id="name"
              name="name"
              className="ff-input"
              value={values.name}
              onChange={onChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "err-name" : undefined}
              autoComplete="name"
              required
            />
            {errors.name && <p id="err-name" className="error">{errors.name}</p>}
          </div>

          <div className="field">
            <label htmlFor="email" className="ff-label">Email</label>
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

          <div className="field">
            <label htmlFor="message" className="ff-label">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="ff-input"
              value={values.message}
              onChange={onChange}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "err-message" : undefined}
              placeholder="Tell us how we can help…"
              required
            />
            {errors.message && <p id="err-message" className="error">{errors.message}</p>}
          </div>

          <button type="submit" className="btn" aria-label="Send message">
            Send Message
          </button>
        </form>

        {/* Contact info card */}
        <aside className="footer-card" aria-label="Contact information">
          <h2 className="footer-title">Get in touch</h2>
          <p className="footer-text">
            Prefer email or a quick call? We’re available during business hours.
          </p>
          <div className="divider" />
          <p className="footer-text"><strong>Email:</strong> support@shopx.example</p>
          <p className="footer-text"><strong>Phone:</strong> +92 (051) 123‑4567</p>
          <div className="divider" />
          <p className="footer-small">Response time is usually within 2–3 business days.</p>
        </aside>
      </div>
    </section>
  );
}
