#!/usr/bin/env node
/**
 * Deploy dist/ to Azure Static Web Apps using token from .env.local.
 * Run: npm run deploy:azure (after npm run build with BASE_PATH=/)
 */
import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const envPath = join(root, ".env.local");

if (!existsSync(envPath)) {
  console.error(".env.local not found. Create it with AZURE_SWA_DEPLOYMENT_TOKEN=your-token");
  process.exit(1);
}

const content = readFileSync(envPath, "utf8");
const match = content.match(/AZURE_SWA_DEPLOYMENT_TOKEN=(.+)/m);
const token = match ? match[1].trim().replace(/#.*$/, "").trim() : "";

if (!token) {
  console.error("AZURE_SWA_DEPLOYMENT_TOKEN not set in .env.local");
  process.exit(1);
}

const distPath = join(root, "dist");
console.log("Deploying dist/ to Azure Static Web Apps...");
execSync(`swa deploy "${distPath}" --deployment-token ${token}`, {
  stdio: "inherit",
  cwd: root,
});
