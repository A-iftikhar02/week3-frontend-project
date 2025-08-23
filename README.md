# 🛍️ Week 3 Frontend Development Project

A fully responsive **React + Vite eCommerce storefront** built as part of my Week 3 Frontend Development Internship.  
The project simulates a modern shopping experience with products, filters, a shopping cart, and a secure checkout flow.

---

## 🚀 Features

- 🔹 **Home Page** with hero banner and featured products  
- 🔹 **Shop Page** with product grid, category filter, search & sorting  
- 🔹 **Product Details Page** with:
  - Large image gallery
  - Rating stars + review count
  - Product highlights/features
  - Quantity selector + Add to Cart  
- 🔹 **Shopping Cart**
  - Add/remove products
  - Quantity management
  - Auto-save cart (localStorage)  
- 🔹 **Checkout Page**
  - Billing & payment form with validation
  - Order summary
  - Order confirmation message + Continue Shopping option  
- 🔹 **Responsive Design**
  - Works seamlessly on desktop, tablet, and mobile  
- 🔹 **Accessibility**
  - Semantic HTML, ARIA labels, focus states  

---

## 🛠️ Tech Stack

- **React 18** (with Vite)
- **React Router DOM**
- **Context API** (Cart state management)
- **CSS3** (custom responsive styles)
- **LocalStorage** (cart persistence)

---

## 📂 Project Structure

src/
┣ components/ # Reusable UI components
┣ data/ # Products data (JSON-like)
┣ pages/ # App pages (Home, Shop, Product, Cart, Checkout, About, Contact)
┣ store/ # Cart context provider
┣ utils/ # Helpers (formatPrice, validators)
┣ App.jsx # Routes & layout
┣ main.jsx # Entry point
┗ styles.css # Global styles


---

## ⚡ Setup & Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/A-iftikhar02/week3-frontend-project.git
   cd week3-frontend-project
Install dependencies


npm install
Run the project


npm run dev
Open http://localhost:5173/ in your browser 🚀
