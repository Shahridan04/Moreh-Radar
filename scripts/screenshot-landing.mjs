import { chromium } from 'playwright';

const url = process.env.URL || 'http://localhost:3000';
const browser = await chromium.launch();
const page = await browser.newPage();

// Desktop viewport
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto(url, { waitUntil: 'networkidle' });
await page.screenshot({ path: 'landing-desktop.png', fullPage: true });

// Mobile viewport
await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({ path: 'landing-mobile.png', fullPage: true });

await browser.close();
console.log('Screenshots saved: landing-desktop.png, landing-mobile.png');
