const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://ramakrishna-johannesburg.org.za/on-this-day?preview=true&date=June-6', { waitUntil: 'networkidle2' });
  const content = await page.content();
  if (content.includes('White Birch Lodge')) {
    console.log('Found White Birch Lodge!');
  } else {
    console.log('NOT FOUND White Birch Lodge.');
    const dateText = await page.evaluate(() => document.querySelector('h1') ? document.body.innerText : 'No text');
    console.log(dateText.substring(0, 500));
  }
  await browser.close();
})();
