// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../store/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();

  const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <header className="navbar" role="banner">
      <div className="container nav-inner">
        {/* Brand (link to home for usability) */}
        <Link to="/" className="logo" aria-label="ShopX – go to homepage">
          <span className="logo-icon" aria-hidden="true"></span>
          <span className="logo-text">ShopX</span>
        </Link>

        {/* Primary navigation */}
        <nav className="nav-links" aria-label="Primary">
          <NavLink to="/" end className={linkClass} aria-label="Home">
            Home
          </NavLink>

          <NavLink to="/shop" className={linkClass} aria-label="Browse shop">
            Shop
          </NavLink>

          <NavLink to="/about" className={linkClass} aria-label="About us">
            About
          </NavLink>

          <NavLink to="/contact" className={linkClass} aria-label="Contact us">
            Contact
          </NavLink>

          {/* Cart with badge */}
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "nav-link cart-link active" : "nav-link cart-link")}
            aria-label={cartCount ? `Cart, ${cartCount} item${cartCount === 1 ? "" : "s"}` : "Cart"}
          >
            Cart
            {cartCount > 0 && (
              <span className="cart-count" aria-hidden="true">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
