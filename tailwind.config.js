/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#FFB700",
        secondary: "#64748b",
        accent: "#f59e0b",
        muted: "#f3f4f6",
        danger: "#ef4444",
        success: "#10b981",
        info: "#3b82f6",
        dark: "#0f172a",
        light: "#ffffff",
        gary: "#757D75",
        brand: {
          light: "#ffffff",
          dark: "#0f172a",
          textLight: "#1e293b",
          textDark: "#f1f5f9",
        },
      },
      fontFamily: {
        primary: ['"Asgard Trial"', "sans-serif"],
        secondary: ['"Glancyr"', "sans-serif"],
        asgard: ['"Asgard Trial"', "sans-serif"],
        glancyr: ['"Glancyr"', "sans-serif"],
        GlancyrBold: ['"GlancyrBold"', "sans-serif"],
        Brutalism: ['"Brutalism"', "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 4s linear infinite",
        spin: "spin 2s linear infinite",
        marquee: "marquee 30s linear infinite",
        marquee1: "marquee 30s linear infinite",
        fadeIn: "fadeIn 0.6s ease-out",
        slideInUp: "slideInUp 0.6s ease-out",
        slideInLeft: "slideInLeft 0.6s ease-out",
        fadeInUp: "fadeInUp 0.8s ease-out forwards",
        scribble: "scribble 1.5s ease-in-out infinite",
      },
      boxShadow: {
        xl: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee1: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideInUp: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-20px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        scribble: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};
