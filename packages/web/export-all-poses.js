import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const poses = [
  'vitruvian',
  'planche',
  'straddle-planche',
  'handstand',
  'straddle-handstand',
  'pistol-squat-(left)',
  'pistol-squat-(right)',
  'muscle-up',
  'muscle-up-(pull-phase)',
  'front-lever',
  'straddle-front-lever',
  'back-lever',
  'l-sit',
  'v-sit',
];

const outputDir = path.join(process.cwd(), '..', '..', 'pose-exports');

async function exportAllPoses() {
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🚀 Launching browser...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport for square export
  await page.setViewport({ width: 800, height: 800, deviceScaleFactor: 2 });

  for (const poseName of poses) {
    const url = `http://localhost:5173/?pose=${poseName}`;
    console.log(`📸 Exporting: ${poseName}`);
    
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.waitForSelector('#export-pose');
    
    const element = await page.$('#export-pose');
    const filename = `pose-${poseName}.png`;
    const filepath = path.join(outputDir, filename);
    
    await element.screenshot({ path: filepath });
    console.log(`   ✅ ${filename}`);
  }

  await browser.close();
  console.log(`\n🎉 Done! Exported ${poses.length} poses to: ${outputDir}`);
}

exportAllPoses().catch(console.error);
