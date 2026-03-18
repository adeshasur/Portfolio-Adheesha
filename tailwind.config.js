/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cloud: "#f6f5ef",
        ink: "#141414",
        mist: "#f4f3ee",
        gold: "#c5a24d",
      },
      boxShadow: {
        glass: "0 28px 70px rgba(15, 23, 42, 0.08)",
        float: "0 18px 40px rgba(15, 23, 42, 0.1)",
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
      },
      backgroundImage: {
        "soft-grid":
          "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
