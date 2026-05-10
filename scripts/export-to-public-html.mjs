import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const outDir = join(root, "out");
const publicHtmlDir = join(root, "public_html");

if (!existsSync(outDir)) {
  throw new Error("Next.js export output was not found. Run next build before copying files.");
}

rmSync(publicHtmlDir, { recursive: true, force: true });
cpSync(outDir, publicHtmlDir, { recursive: true });

for (const entry of readdirSync(root, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith(".html") && entry.name !== "index.html") {
    cpSync(join(root, entry.name), join(publicHtmlDir, entry.name));
  }
}

for (const assetPath of ["pages", "assets", "style.css", "app.js"]) {
  const source = join(root, assetPath);
  if (existsSync(source)) {
    cpSync(source, join(publicHtmlDir, assetPath), { recursive: true });
  }
}

mkdirSync(publicHtmlDir, { recursive: true });
console.log("Static export copied to public_html with legacy pages and assets.");
