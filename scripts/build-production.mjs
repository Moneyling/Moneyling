#!/usr/bin/env node
/**
 * Build for production with BASE_PATH=./ (relative paths).
 * Works at both moneyling.org (root) and moneyling.github.io/Moneyling/ (project path).
 * Use before: npm run deploy:azure, npm run swa:dist, or GitHub Pages deploy.
 */
import { execSync } from "child_process";

process.env.BASE_PATH = "./";
execSync("npx vite build", { stdio: "inherit", env: process.env });
