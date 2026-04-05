import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,js}"],
  theme: {
    extend: {
      fontFamily: {
        "serif-display": ['"DM Serif Display"', "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
