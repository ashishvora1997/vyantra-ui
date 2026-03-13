// scripts/build-css.js
import fs from "fs";
import path from "path";

// source CSS
const srcCss = path.resolve("src/tokens.css");
// destination
const distCss = path.resolve("dist/tokens.css");

// make sure dist exists
const distDir = path.dirname(distCss);
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

// copy file
fs.copyFileSync(srcCss, distCss);

console.log("✅ tokens.css copied to dist");