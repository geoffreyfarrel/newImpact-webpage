import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        dark: {
          extend: "dark", // <- inherit default values from dark theme
          colors: {
            background: "#05122d",
            foreground: "#ffffff",
            primary: {
              50: "#e3e5ea",
              100: "#b7bfcd",
              200: "#8a96ab",
              300: "#5f6f8a",
              400: "#3f5375",
              500: "#1d3961",
              600: "#17325a",
              700: "#0f2a50",
              800: "#092144",
              900: "#05122d",
              DEFAULT: "#1F387F",
              foreground: "#ffffff",
            },
            focus: "#8CA9E9",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }),
  ],
} satisfies Config;
