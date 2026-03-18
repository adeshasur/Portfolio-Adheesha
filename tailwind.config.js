/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        cloud: "#f8f6f1",
        ink: "#111111",
        gold: "#c7a554",
        mist: "#ebe5d6"
      },
      boxShadow: {
        glass: "0 24px 80px rgba(15, 23, 42, 0.12)",
        soft: "0 18px 50px rgba(255, 255, 255, 0.18) inset, 0 16px 40px rgba(15, 23, 42, 0.08)",
        tile: "0 18px 40px rgba(15, 23, 42, 0.1)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,0.26) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.26) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};
