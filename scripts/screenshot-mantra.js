const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 800, height: 600 });
  
  // Mantra card
  await page.goto('http://localhost:5173/mantra', { waitUntil: 'networkidle0' });
  await page.screenshot({ 
    path: 'assets/mantra-card.png',
    fullPage: false 
  });
  console.log('Screenshot saved to assets/mantra-card.png');
  
  // Flash cards - full page
  await page.setViewport({ width: 800, height: 2400 });
  await page.goto('http://localhost:5173/flashcards', { waitUntil: 'networkidle0' });
  await page.screenshot({ 
    path: 'assets/flashcards.png',
    fullPage: true 
  });
  console.log('Screenshot saved to assets/flashcards.png');
  
  await browser.close();
})();
