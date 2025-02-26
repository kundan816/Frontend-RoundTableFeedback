/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enables dark mode
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", //  Include Next.js `app` directory
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}", //  Ensure it scans the `src` folder
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
