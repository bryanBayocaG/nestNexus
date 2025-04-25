/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9E1C1C", // Noxian Red
        secondary: "#D4AF37", // Noxian Gold
        dark: "#1E1E1E", // Optional: Noxian Black
      },
    },
  },
  plugins: [],
};
