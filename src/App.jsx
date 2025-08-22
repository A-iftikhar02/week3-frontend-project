// src/App.jsx
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTopButton from "./components/ScrollToTopButton.jsx";

import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  return (
    <>
      {/* Skip link for accessibility */}
      <a href="#top" className="skip-link">
        Skip to content
      </a>

      <Navbar />

      {/* Main content area */}
      <main id="top" role="main" className="container" style={{ padding: "16px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </main>

      <ScrollToTopButton />
      <Footer />
    </>
  );
}
