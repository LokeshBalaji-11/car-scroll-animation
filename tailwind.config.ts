import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: { extend: { colors: { trail: "#e5171f" } } },
  plugins: [],
};

export default config;