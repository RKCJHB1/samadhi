import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  await page.goto("https://ramakrishna-johannesburg.org.za/on-this-day?preview=true&date=June-2", { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 2000));
  
  // Click on the second event
  await page.evaluate(() => {
    const events = Array.from(document.querySelectorAll('#event_scroll button'));
    if (events.length > 1) {
      events[1].click();
    }
  });

  await new Promise(r => setTimeout(r, 1500));
  
  await page.screenshot({ path: 'screenshot.png' });
  console.log("Saved screenshot.png");

  await browser.close();
})();
