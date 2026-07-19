import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  await page.goto("https://ramakrishna-johannesburg.org.za/on-this-day?preview=true&date=June-2", { waitUntil: "networkidle0" });
  await new Promise(r => setTimeout(r, 2000));
  
  const getInfo = async () => {
    return await page.evaluate(() => {
      const activeEventBtn = document.querySelector('button.bg-\\[\\#E26D5C\\]');
      const activeEventText = activeEventBtn ? activeEventBtn.innerText : 'none';
      const imgs = Array.from(document.querySelectorAll('img'));
      
      const allEvents = Array.from(document.querySelectorAll('#event_scroll button')).map(b => b.innerText.split('\n')[0]);
      
      return { 
        activeEventText,
        allEvents,
        imgs: imgs.map(i => i.src)
      };
    });
  };

  console.log("Initial info:", await getInfo());
  
  // Click on the second event
  await page.evaluate(() => {
    const events = Array.from(document.querySelectorAll('#event_scroll button'));
    if (events.length > 1) {
      events[1].click();
    }
  });

  await new Promise(r => setTimeout(r, 1500));
  
  console.log("After clicking 2nd event:", await getInfo());

  await browser.close();
})();
