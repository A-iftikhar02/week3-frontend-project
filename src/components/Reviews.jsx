// src/components/Reviews.jsx
import RatingStars from "./RatingStars";

function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(s => s[0]?.toUpperCase())
    .join("");
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit"
    });
  } catch {
    return iso;
  }
}

export default function Reviews({ reviews = [] }) {
  const count = reviews.length;
  const avg =
    count > 0
      ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / count).toFixed(1)
      : null;

  return (
    <section className="reviews-block" aria-labelledby="reviews-heading">
      <div className="reviews-header">
        <h2 id="reviews-heading" className="reviews-title">Customer Reviews</h2>
        {avg && (
          <div className="reviews-summary">
            <RatingStars rating={Number(avg)} size={18} />
            <span className="reviews-meta">
              {avg} out of 5 • {count} review{count === 1 ? "" : "s"}
            </span>
          </div>
        )}
      </div>

      {count === 0 ? (
        <p className="reviews-empty">No reviews yet. Be the first to write one!</p>
      ) : (
        <ul className="reviews-list">
          {reviews.map(r => (
            <li key={r.id} className="review-item">
              <div className="review-avatar" aria-hidden="true">
                {initials(r.name)}
              </div>

              <div className="review-body">
                <div className="review-row">
                  <strong className="review-name">{r.name}</strong>
                  <RatingStars rating={r.rating} size={16} compact />
                </div>
                <div className="review-sub">
                  <span className="review-date">{formatDate(r.date)}</span>
                </div>
                {r.title && <div className="review-title">{r.title}</div>}
                <p className="review-text">{r.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
