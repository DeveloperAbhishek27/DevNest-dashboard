/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-space)"], // 👈 Space Grotesk
        body: ["var(--font-inter)"],
      },
      colors: {
        brand: "#ff6912",
        shadowblue: "#290f03",
        homeBg: "#02060f",
      },
    },
  },
  plugins: [],
};
