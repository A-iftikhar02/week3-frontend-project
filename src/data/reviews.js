// src/data/reviews.js
export const REVIEWS = {
  // Smartwatch Pro X — richer sample
  p002: [
    {
      id: "r1",
      name: "Ayesha K.",
      rating: 5,
      title: "Battery life is legit",
      text: "Lasts me a full week with workouts and notifications. Screen is bright outdoors.",
      date: "2025-07-18"
    },
    {
      id: "r2",
      name: "Hamza R.",
      rating: 4,
      title: "Great for fitness tracking",
      text: "Heart rate + sleep tracking are accurate. Wish there were more strap options.",
      date: "2025-07-10"
    },
    {
      id: "r3",
      name: "Sara M.",
      rating: 5,
      title: "Waterproof and quick GPS lock",
      text: "Swam twice with it, no issues. GPS locks fast on runs.",
      date: "2025-06-29"
    }
  ],

  // Fallback reviews for other products (use the same few to keep it simple)
  default: [
    {
      id: "r4",
      name: "Ali Z.",
      rating: 4,
      title: "Solid value",
      text: "Good quality for the price. Packaging was neat.",
      date: "2025-05-12"
    },
    {
      id: "r5",
      name: "Noor F.",
      rating: 5,
      title: "Exactly as described",
      text: "Matches the pictures and description. Would recommend to a friend.",
      date: "2025-04-23"
    }
  ]
};
