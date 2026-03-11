/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
      },
      colors: {
        /* Primary */
        primary: "#466431",
        "primary-light": "#77A440",
        "brand-green": "#A4BE86",
        gold: "#CCB269",
        /* Secondary */
        navy: "#2C4B8E",
        "warm-gray": "#736F67",
        "gray-light": "#D8D7D6",
        /* Action / urgency */
        maroon: "#6E3032",
        coral: "#EA7D59",
        /* Utility + diversity */
        "body-color": "#4A4A4A",
        mint: "#C5E0A6",
        cream: "#F5F0E6",
        teal: "#2D6B6B",
      },
      backgroundImage: {
        "green-gradient": "linear-gradient(135deg, #466431 0%, #77A440 100%)",
        "gold-subtle": "linear-gradient(135deg, #f5f0e6 0%, #e8dcc4 100%)",
      },
    },
  },
  plugins: [],
};
