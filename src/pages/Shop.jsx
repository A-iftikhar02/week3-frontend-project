// src/pages/Shop.jsx
import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../data/products";
import FilterBar from "../components/FilterBar"; // <- the stylish controls

export default function Shop() {
  // --- state
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all"); // <-- show ALL by default
  const [sort, setSort] = useState("price-asc");

  // unique categories (sorted) + "all"
  const categories = useMemo(() => {
    const set = new Set(PRODUCTS.map((p) => p.category));
    return ["all", ...Array.from(set).sort()];
  }, []);

  // filtering + sorting
  const filtered = useMemo(() => {
    let out = PRODUCTS;

    if (category !== "all") {
      out = out.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      out = out.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "price-asc":
        out = [...out].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        out = [...out].sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        out = [...out].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "title-asc":
        out = [...out].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        out = [...out].sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return out;
  }, [search, category, sort]);

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("price-asc");
  };

  return (
    <div className="section">
      <h1>Shop</h1>

      {/* Pretty filter bar */}
      <FilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={categories}
        sort={sort}
        setSort={setSort}
      />

      {/* results meta OR empty state */}
      {filtered.length === 0 ? (
        <div className="empty-state" role="status" aria-live="polite">
          <h2>No products found</h2>
          <p>Try clearing filters or searching something else.</p>
          <button className="btn" onClick={resetFilters}>Reset Filters</button>
        </div>
      ) : (
        <>
          <p style={{ color: "var(--muted)", marginTop: 8 }}>
            Showing <strong>{filtered.length}</strong> of {PRODUCTS.length} products
          </p>

          {/* products */}
          <div className="grid products">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
