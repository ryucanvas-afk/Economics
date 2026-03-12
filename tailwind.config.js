/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        up: "#FF3B30",     // 상승 = 빨간색 (한국 관례)
        down: "#007AFF",   // 하락 = 파란색
        surface: {
          DEFAULT: "#111113",
          card: "#1C1C1E",
          hover: "#2C2C2E",
        },
        muted: "#8E8E93",
        border: "#38383A",
      },
      fontFamily: {
        sans: ["'Pretendard Variable'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["'SF Mono'", "'Fira Code'", "monospace"],
      },
    },
  },
  plugins: [],
};
