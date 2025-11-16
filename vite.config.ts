import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Set the correct base for GitHub Pages project site
  base: "/Gallaxia-Frame/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  // Output build to "docs" so GitHub Pages can serve from main/docs
  build: {
    outDir: "docs",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
