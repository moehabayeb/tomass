/**
 * Capture iPad 13" screenshots for App Store Connect.
 * Output: 2064 × 2752 px (portrait) — matches Apple's requirement.
 *
 * Usage: npx playwright test scripts/ipad-screenshots.mjs
 *   or:  node scripts/ipad-screenshots.mjs
 */
import { chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '..', 'ipad-screenshots');

// iPad 13" portrait: 2064 × 2752 at 2x DPR → viewport 1032 × 1376
const viewport = { width: 1032, height: 1376 };
const deviceScaleFactor = 2;

const pages = [
  { name: '01-speaking', path: '/' },
  { name: '02-pricing', path: '/pricing' },
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor,
    colorScheme: 'dark',
  });

  const page = await context.newPage();

  for (const { name, path: pagePath } of pages) {
    const url = `http://localhost:8082${pagePath}`;
    console.log(`Capturing ${name} → ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' });
    // Extra wait for animations to settle
    await page.waitForTimeout(2000);
    const file = path.join(outDir, `${name}.png`);
    await page.screenshot({ path: file, fullPage: false });
    console.log(`  → Saved ${file}`);
  }

  await browser.close();
  console.log(`\nDone! Screenshots saved to ${outDir}`);
})();
