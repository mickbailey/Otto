import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// BASE_PATH is set by the GitHub Pages workflow (/<repo-name>/). Locally it's "/".
export default defineConfig({
  base: process.env.BASE_PATH ?? "/",
  plugins: [react(), tailwindcss()],
  // The single-file demo build (BASE_PATH=./) inlines images so the page has no loose files.
  build: process.env.BASE_PATH === "./" ? { assetsInlineLimit: 1_000_000 } : {},
});
