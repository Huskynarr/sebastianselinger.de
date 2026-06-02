/* Render the generated CV HTML templates to PDF via headless Chromium.
   Run from the repo root so `playwright` resolves from node_modules.
   Usage: node scripts/render-cv.mjs <build-dir> */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const BUILD = process.argv[2] || path.resolve('.cv-build');
const pw = await import('playwright');
const { chromium } = pw.default || pw;

const manifest = JSON.parse(await readFile(path.join(BUILD, 'manifest.json'), 'utf-8'));
const browser = await chromium.launch();

for (const m of manifest) {
  const page = await browser.newPage();
  const fileUrl = pathToFileURL(path.join(BUILD, m.html)).href;
  await page.goto(fileUrl, { waitUntil: 'networkidle' });
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  await writeFile(path.join(BUILD, m.pdf), pdf);
  await page.close();
  console.log(`rendered ${m.pdf} (${(pdf.length / 1024).toFixed(0)} KB)`);
}

await browser.close();
