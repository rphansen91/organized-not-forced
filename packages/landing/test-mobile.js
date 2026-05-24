// Quick test to verify mobile figure renders
const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');
const hasMobileFigure = html.includes('mobile-figure-wrapper');
const hasMobilePoseCanvas = html.includes('mobile-pose-figure');
console.log('Has mobile-figure-wrapper:', hasMobileFigure);
console.log('Has mobile-pose-figure:', hasMobilePoseCanvas);
