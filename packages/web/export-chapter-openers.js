import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const chapters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const outputDir = path.join(process.cwd(), '..', '..', 'assets', 'chapter-openers');

async function exportChapterOpeners() {
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🚀 Launching browser...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport for 6x9 book pages (600x900 at 2x for high DPI)
  await page.setViewport({ width: 700, height: 1000, deviceScaleFactor: 2 });

  // Navigate to chapter openers page
  const url = 'http://localhost:5173/?chapters';
  console.log('📖 Loading chapter openers page...');
  await page.goto(url, { waitUntil: 'networkidle0' });

  for (const chapterNum of chapters) {
    const selector = `#chapter-opener-${chapterNum}`;
    console.log(`📸 Exporting: Chapter ${chapterNum}`);
    
    await page.waitForSelector(selector);
    const element = await page.$(selector);
    
    const filename = `chapter-${chapterNum}-opener.png`;
    const filepath = path.join(outputDir, filename);
    
    await element.screenshot({ path: filepath });
    console.log(`   ✅ ${filename}`);
  }

  await browser.close();
  console.log(`\n🎉 Done! Exported ${chapters.length} chapter openers to: ${outputDir}`);
}

exportChapterOpeners().catch(console.error);
