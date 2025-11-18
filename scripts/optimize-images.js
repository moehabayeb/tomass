/**
 * Image Optimization Script
 * Optimizes tomas-avatar.png from 1.7MB to <100KB
 * Creates WebP versions at multiple sizes for responsive loading
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_IMAGE = path.join(__dirname, '../src/assets/tomas-avatar.png');
const OUTPUT_DIR = path.join(__dirname, '../src/assets');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');

  const stats = fs.statSync(INPUT_IMAGE);
  console.log(`📦 Original size: ${(stats.size / 1024 / 1024).toFixed(2)} MB\n`);

  try {
    // Get original image metadata
    const metadata = await sharp(INPUT_IMAGE).metadata();
    console.log(`📐 Original dimensions: ${metadata.width}x${metadata.height}\n`);

    // Create optimized WebP versions at different sizes
    const sizes = [
      { width: 256, suffix: '-256' },
      { width: 512, suffix: '-512' },
      { width: 1024, suffix: '-1024' }
    ];

    let totalSaved = 0;

    for (const { width, suffix } of sizes) {
      const outputPath = path.join(OUTPUT_DIR, `tomas-avatar${suffix}.webp`);

      await sharp(INPUT_IMAGE)
        .resize(width, width, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: 85 })
        .toFile(outputPath);

      const outputStats = fs.statSync(outputPath);
      const sizeKB = (outputStats.size / 1024).toFixed(2);
      console.log(`✅ Created ${path.basename(outputPath)}: ${sizeKB} KB`);
      totalSaved += stats.size - outputStats.size;
    }

    // Create optimized PNG fallback (for browsers that don't support WebP)
    const pngOutputPath = path.join(OUTPUT_DIR, 'tomas-avatar-optimized.png');
    await sharp(INPUT_IMAGE)
      .resize(512, 512, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .png({ quality: 80, compressionLevel: 9 })
      .toFile(pngOutputPath);

    const pngStats = fs.statSync(pngOutputPath);
    const pngSizeKB = (pngStats.size / 1024).toFixed(2);
    console.log(`✅ Created ${path.basename(pngOutputPath)}: ${pngSizeKB} KB (PNG fallback)`);

    console.log(`\n💾 Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
    console.log('✨ Image optimization complete!\n');

    // Print recommended usage
    console.log('📝 Recommended usage in components:');
    console.log(`
<picture>
  <source
    srcSet="tomas-avatar-256.webp 256w, tomas-avatar-512.webp 512w, tomas-avatar-1024.webp 1024w"
    type="image/webp"
    sizes="(max-width: 400px) 256px, (max-width: 800px) 512px, 1024px"
  />
  <img
    src="tomas-avatar-optimized.png"
    alt="Tomas AI"
    loading="lazy"
  />
</picture>
    `);

  } catch (error) {
    console.error('❌ Error optimizing images:', error);
    process.exit(1);
  }
}

optimizeImages();
