import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

// For Git-hosted static sites: set BASE_PATH for project pages (e.g. GitHub Pages repo site).
// Example: BASE_PATH=/partner-dashboard/ or /repo-name/
// Leave unset for root hosting (e.g. custom domain or user Pages).
const base = process.env.BASE_PATH || "./";

// Copy index.html to 404.html so GitHub Pages serves the SPA for all routes (direct links, refresh).
function copyIndexTo404() {
  return {
    name: "copy-index-to-404",
    closeBundle() {
      const outDir = path.resolve(__dirname, "dist");
      const indexPath = path.join(outDir, "index.html");
      const notFoundPath = path.join(outDir, "404.html");
      if (fs.existsSync(indexPath)) {
        fs.copyFileSync(indexPath, notFoundPath);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), copyIndexTo404()],
  base,
  server: {
    port: 5174,
    open: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
