import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function exportCover() {
  console.log('🚀 Launching browser...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set viewport to match cover dimensions with 3x scale for 300 DPI
  // Cover is 600x900, 3x = 1800x2700
  await page.setViewport({
    width: 600,
    height: 900,
    deviceScaleFactor: 3
  });
  
  console.log('📄 Loading export page...');
  await page.goto('http://localhost:5173/?export', { waitUntil: 'networkidle0' });
  
  // Wait a moment for fonts and rendering
  await new Promise(r => setTimeout(r, 1000));
  
  // Screenshot the export-cover element
  console.log('📸 Capturing cover...');
  const coverElement = await page.$('#export-cover');
  
  const outputPath = path.join(__dirname, '../../organized-not-forced-cover-final.png');
  
  if (coverElement) {
    await coverElement.screenshot({
      path: outputPath,
      type: 'png'
    });
    console.log(`✅ Cover exported to: ${outputPath}`);
    console.log('   Resolution: 1800x2700px (6"x9" at 300 DPI)');
  } else {
    console.error('❌ Could not find #export-cover element');
  }
  
  await browser.close();
  console.log('🎉 Done!');
}

exportCover().catch(console.error);
