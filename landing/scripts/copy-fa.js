/**
 * Copies FontAwesome Free CSS and webfont assets from node_modules to public/fa/
 * so they can be loaded asynchronously (non-render-blocking) via a preload hint.
 * Run automatically via "postinstall" in package.json.
 */

const fs = require("fs");
const path = require("path");

const src = path.resolve(__dirname, "../node_modules/@fortawesome/fontawesome-free");
const dest = path.resolve(__dirname, "../public/fa");

function copyDir(from, to) {
  if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const srcPath = path.join(from, entry.name);
    const destPath = path.join(to, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy only what we need: css/ and webfonts/
for (const dir of ["css", "webfonts"]) {
  const fromDir = path.join(src, dir);
  const toDir = path.join(dest, dir);
  if (fs.existsSync(fromDir)) {
    copyDir(fromDir, toDir);
    console.log(`✓ Copied @fortawesome/fontawesome-free/${dir}/ → public/fa/${dir}/`);
  } else {
    console.warn(`⚠ Source not found: ${fromDir}`);
  }
}
