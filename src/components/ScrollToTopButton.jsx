// src/components/ScrollToTopButton.jsx
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!show) return null;

  return (
    <button
      className="scroll-to-top"
      onClick={scrollTop}
      aria-label="Scroll to top"
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        background: "#333",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: "45px",
        height: "45px",
        cursor: "pointer",
        fontSize: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
    >
      <FaArrowUp />
    </button>
  );
}

