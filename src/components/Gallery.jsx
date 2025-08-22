// src/components/Gallery.jsx
import { useState, useMemo } from "react";

export default function Gallery({
  images = [],
  altBase = "Product image",
  initialIndex = 0,
}) {
  // Normalize to [{src, alt}]
  const normalized = useMemo(() => {
    const arr = Array.isArray(images) ? images : [];
    const norm = arr
      .map((item, i) =>
        typeof item === "string"
          ? { src: item, alt: `${altBase} ${i + 1}` }
          : { src: item?.src, alt: item?.alt || `${altBase} ${i + 1}` }
      )
      .filter((x) => Boolean(x.src));
    return norm.length
      ? norm
      : [{ src: "/images/placeholder-1.svg", alt: `${altBase} placeholder` }];
  }, [images, altBase]);

  const safeIndex = Math.min(Math.max(initialIndex, 0), normalized.length - 1);
  const [active, setActive] = useState(safeIndex);

  const main = normalized[active];

  return (
    <div className="gallery">
      {/* Main image */}
      <div className="gallery-hero">
        <img
          src={main.src}
          alt={main.alt}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Thumbnails */}
      {normalized.length > 1 && (
        <ul className="thumbs" role="list">
          {normalized.map((img, i) => {
            const isActive = i === active;
            return (
              <li key={`${img.src}-${i}`}>
                <button
                  type="button"
                  className={`thumb ${isActive ? "active" : ""}`}
                  onClick={() => setActive(i)}
                  aria-label={`View image ${i + 1}`}
                  aria-pressed={isActive}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
