import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f1f0ea",  // global background
          100: "#e3e2da",
          200: "#d9d9d9", // borders / dividers
          300: "#c6c6c6",
          400: "#9ca9b5",
          500: "#7f8fa0",
          600: "#4a637f",
          700: "#314f6f", // primary
          800: "#2b3a44", // dark surfaces (navbar/footer)
          900: "#2a292a", // primary text
          950: "#21252a",
        },
        cyan: {
          400: "#4ec2e6", // accent hover / highlight
          500: "#0089b6", // primary accent
          600: "#0089b6",
          700: "#00739a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
