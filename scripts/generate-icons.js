import fs from "fs";
import path from "path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const projectRoot = path.resolve(process.cwd());
const srcImage = path.join(projectRoot, "src", "assets", "frame-overlay.png");
const outDir = path.join(projectRoot, "public");

const sizes = [16, 32, 48, 64, 128];

async function ensureOutDir() {
  await fs.promises.mkdir(outDir, { recursive: true });
}

async function generatePngs() {
  const inputs = [];
  for (const size of sizes) {
    const out = path.join(outDir, `favicon-${size}.png`);
    await sharp(srcImage)
      .resize(size, size, { fit: "cover" })
      .png({ compressionLevel: 9 })
      .toFile(out);
    inputs.push(out);
    console.log(`Generated ${out}`);
  }
  // Apple touch icon (180x180)
  await sharp(srcImage).resize(180, 180, { fit: "cover" }).png({ compressionLevel: 9 }).toFile(path.join(outDir, "apple-touch-icon.png"));
  // Microsoft tile (150x150)
  await sharp(srcImage).resize(150, 150, { fit: "cover" }).png({ compressionLevel: 9 }).toFile(path.join(outDir, "mstile-150x150.png"));
  return inputs;
}

async function generateIco(pngPaths) {
  const icoBuffer = await pngToIco(pngPaths.filter((p) => /favicon-(16|32|48)\.png$/.test(p)));
  const out = path.join(outDir, "favicon.ico");
  await fs.promises.writeFile(out, icoBuffer);
  console.log(`Generated ${out}`);
}

async function main() {
  try {
    await ensureOutDir();
    const pngs = await generatePngs();
    await generateIco(pngs);
    console.log("All favicons generated successfully.");
  } catch (err) {
    console.error("Failed to generate favicons:", err);
    process.exit(1);
  }
}

main();