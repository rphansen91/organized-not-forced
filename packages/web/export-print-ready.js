import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function exportPrintReady() {
  console.log('🚀 Launching browser for print-ready export...');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set viewport to match cover dimensions with 6x scale for 600 DPI
  // Cover is 600x900, 6x = 3600x5400
  await page.setViewport({
    width: 600,
    height: 900,
    deviceScaleFactor: 6
  });
  
  console.log('📄 Loading export page...');
  await page.goto('http://localhost:5173/?export', { waitUntil: 'networkidle0' });
  
  // Wait a moment for fonts and rendering
  await new Promise(r => setTimeout(r, 1000));
  
  // Screenshot the export-cover element
  console.log('📸 Capturing print-ready cover (3600x5400px)...');
  const coverElement = await page.$('#export-cover');
  
  const outputPath = path.join(__dirname, '../../organized-not-forced-print-ready.png');
  
  if (coverElement) {
    await coverElement.screenshot({
      path: outputPath,
      type: 'png'
    });
    console.log(`✅ Print-ready cover exported to: ${outputPath}`);
    console.log('   Resolution: 3600x5400px (6"x9" at 600 DPI)');
    console.log('   Format: PNG (lossless)');
  } else {
    console.error('❌ Could not find #export-cover element');
  }
  
  await browser.close();
  console.log('🎉 Done!');
}

exportPrintReady().catch(console.error);
