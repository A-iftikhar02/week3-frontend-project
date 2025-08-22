// src/store/CartContext.jsx
import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);
const CART_KEY = "cart-v1";

function normalizeImage(img) {
  if (!img) return "/images/placeholder-1.svg";
  if (typeof img === "string") return img;
  if (typeof img === "object" && img.src) return img.src;
  return "/images/placeholder-1.svg";
}
function normalizeLine(line) {
  return {
    id: line.id,
    title: line.title,
    price: Number(line.price) || 0,
    image: normalizeImage(line.image || line.images?.[0]),
    qty: Math.max(1, Number(line.qty) || 1),
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const { product, qty } = action.payload;
      const existing = state.items.find(i => i.id === product.id);
      let items;
      if (existing) {
        items = state.items.map(i => i.id === product.id ? { ...i, qty: Math.min(99, i.qty + qty) } : i);
      } else {
        items = [...state.items, normalizeLine({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images?.[0], // string or {src,alt}
          qty
        })];
      }
      return { ...state, items };
    }
    case "INCREMENT": {
      const id = action.payload;
      return { ...state, items: state.items.map(i => i.id === id ? { ...i, qty: Math.min(99, i.qty + 1) } : i) };
    }
    case "DECREMENT": {
      const id = action.payload;
      return { ...state, items: state.items.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i) };
    }
    case "REMOVE": {
      const id = action.payload;
      return { ...state, items: state.items.filter(i => i.id !== id) };
    }
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

// 👉 Lazy initializer: runs once before first render
function initFromStorage() {
  try {
    const raw = localStorage.getItem(CART_KEY) || localStorage.getItem("cart");
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);
    const rawItems = Array.isArray(parsed?.items) ? parsed.items : [];
    return { items: rawItems.map(normalizeLine) };
  } catch {
    return { items: [] };
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, initFromStorage);

  // Save on changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify({ items: state.items }));
    } catch {}
  }, [state.items]);

  const subtotal = useMemo(() => state.items.reduce((s, i) => s + i.price * i.qty, 0), [state.items]);
  const cartCount = useMemo(() => state.items.reduce((s, i) => s + i.qty, 0), [state.items]);

  const value = {
    items: state.items,
    subtotal,
    cartCount,
    addToCart: (product, qty = 1) => dispatch({ type: "ADD", payload: { product, qty } }),
    increment: (id) => dispatch({ type: "INCREMENT", payload: id }),
    decrement: (id) => dispatch({ type: "DECREMENT", payload: id }),
    remove: (id) => dispatch({ type: "REMOVE", payload: id }),
    clear: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
