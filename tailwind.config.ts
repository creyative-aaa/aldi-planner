import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      colors: {
        paper: "#F2EBDD",
        surface: "#FBF6E9",
        surface2: "#F7F0DE",
        ink: "#1F2230",
        inksoft: "#3A3D4A",
        inkmute: "#6B6F7A",
        line: "#D9CFB4",
        linesoft: "#E8DFC7",
        forest: "#2D4A3E",
        forestdeep: "#1E3329",
        copper: "#B8693D",
        ochre: "#C0914A",
        bronze: "#8C6A3F",
        warn: "#A8431F",
        good: "#3F6A4B",
      },
      borderRadius: {
        DEFAULT: "6px",
        sm: "3px",
      },
    },
  },
  plugins: [],
};

export default config;
