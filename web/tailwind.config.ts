import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        mist: "#f8fafc",
        coral: "#ff6b57",
        ocean: "#1d4ed8",
        sand: "#f4e7d3"
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        card: "0 24px 50px rgba(15, 23, 42, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;

