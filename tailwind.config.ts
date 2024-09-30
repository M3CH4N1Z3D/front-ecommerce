import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tema: "#5E9400",
         boxShadow: {
        'custom-green': '5px 5px 10px #5E9400'},
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
