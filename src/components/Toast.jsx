import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const t = setTimeout(() => onClose?.(), 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`toast ${type}`}
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 2000,
        padding: "12px 18px",
        borderRadius: "8px",
        color: "#fff",
        fontWeight: 600,
        background: type === "success" ? "linear-gradient(90deg,#22c55e,#16a34a)" : "#ef4444",
        boxShadow: "0 6px 16px rgba(0,0,0,.3)",
      }}
    >
      {message}
    </div>
  );
}
