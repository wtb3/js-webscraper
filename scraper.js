const puppeteer = require('puppeteer');

(async function scrape() {
  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();
  await page.goto('https://quotes.toscrape.com/search.aspx');

  await page.waitForSelector('#author');
  await page.waitForSelector('#tag');

  await page.select('select#author', 'Albert Einstein');
  await page.select('select#tag', 'learning');

  await page.click('.btn');
  await page.waitForSelector('.quote');

  let quotes = await page.evaluate(() => {
    let quotesElement = document.body.querySelectorAll('.quote');
    let quotes = Object.values(quotesElement).map(x => {
      return {
        author: x.querySelector('.author').textContent ?? null,
        quote: x.querySelector('.content').textContent ?? null,
        tag: x.querySelector('.tag').textContent ?? null,
      };
    });
    return quotes;
  });

  console.log(quotes);
  await browser.close();
})();
