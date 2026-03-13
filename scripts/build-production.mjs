#!/usr/bin/env node
/**
 * Build for production with BASE_PATH=/ (works on Windows and Unix).
 * Use before: npm run deploy:azure, or npm run swa:dist
 */
import { execSync } from "child_process";

process.env.BASE_PATH = "/";
execSync("npx vite build", { stdio: "inherit", env: process.env });
