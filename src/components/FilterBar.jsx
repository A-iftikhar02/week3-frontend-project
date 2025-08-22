// src/components/FilterBar.jsx
export default function FilterBar({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  categories = [],
}) {
  return (
    <aside className="filter-bar" aria-label="Product filters">
      <div className="filter-card">
        {/* Search */}
        <label className="field">
          <span className="ff-label">Search</span>
          <span className="ff-icon" aria-hidden>
            {/* magnifier */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
          <input
            className="ff-input"
            type="search"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
            aria-label="Search products"
          />
        </label>

        {/* Category */}
        <label className="field">
          <span className="ff-label">Category</span>
          <span className="ff-icon" aria-hidden>
            {/* folder */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"
                stroke="currentColor" strokeWidth="2" fill="none"
              />
            </svg>
          </span>
          <div className="select-wrap">
            <select
              className="ff-input nice-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Filter by category"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </label>

        {/* Sort */}
        <label className="field">
          <span className="ff-label">Sort</span>
          <span className="ff-icon" aria-hidden>
            {/* up/down arrows */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M8 4l-3 3 3 3" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M5 7h8" stroke="currentColor" strokeWidth="2" />
              <path d="M16 20l3-3-3-3" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M19 17H11" stroke="currentColor" strokeWidth="2" />
            </svg>
          </span>
          <div className="select-wrap">
            <select
              className="ff-input nice-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Rating: High to Low</option>
              <option value="alpha-asc">A → Z</option>
              <option value="alpha-desc">Z → A</option>
            </select>
          </div>
        </label>
      </div>
    </aside>
  );
}
