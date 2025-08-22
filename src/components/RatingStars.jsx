// src/components/RatingStars.jsx
export default function RatingStars({
  rating = 0,          // 0..5 (can be decimal)
  count,               // optional review count number
  size = 18,           // px
  compact = false,     // if true, tucks count right after stars
  ariaLabel,           // optional custom label
}) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  const label = ariaLabel ?? `Rated ${rating} out of 5${count ? ` from ${count} reviews` : ""}`;

  const Star = ({ type = "full" }) => {
    // one SVG shape; we’ll clip for half
    const path =
      "M12 .587l3.668 7.431 8.2 1.192-5.934 5.785 1.401 8.161L12 19.771 4.665 23.156l1.401-8.161L.132 9.21l8.2-1.192L12 .587z";
    if (type === "full") {
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={path} />
        </svg>
      );
    }
    if (type === "half") {
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          {/* left filled half */}
          <defs>
            <clipPath id="half-clip">
              <rect x="0" y="0" width="12" height="24" />
            </clipPath>
          </defs>
          <path d={path} className="half-base" />
          <g clipPath="url(#half-clip)">
            <path d={path} />
          </g>
        </svg>
      );
    }
    // empty
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={path} className="empty" />
      </svg>
    );
  };

  return (
    <span
      className={`stars ${compact ? "compact" : ""}`}
      role="img"
      aria-label={label}
      title={label}
      style={{ "--star-size": `${size}px` }}
    >
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} type="full" />
      ))}
      {half && <Star type="half" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} type="empty" />
      ))}

      {typeof count === "number" && count > 0 && (
        <span className="rating-count">{compact ? ` (${count})` : ` ${count} reviews`}</span>
      )}
    </span>
  );
}
