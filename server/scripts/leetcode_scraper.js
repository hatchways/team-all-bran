var puppeteer = require('puppeteer');
var fs = require('fs');

var scraper = (async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.leetcode.com/problemset/all');
  await page.waitForSelector('select.form-control', { timeout: 10000 });
  await page.select('select.form-control', '9007199254740991');

  const questions = await page.evaluate(() => {
    const questions = [];
    const trs = Array.from(document.getElementsByClassName('reactable-data')[0].rows, tr => tr);

    trs.forEach((tr) => {
      const tds = Array.from(tr.getElementsByTagName('td'), td => td);
      const a = Array.from(tds[2].getElementsByTagName('a'), a => a)[0];
      const questionUrl = a.href;
      if (questionUrl.startsWith("https://leetcode.com/problems/")) {
        const title = a.innerText;
        const index = tds[1].innerText;
        const difficulty = tds[5].innerText;

        questions.push({
          index: index,
          url: questionUrl,
          title: title,
          difficulty: difficulty
        })
      }
    })
    return questions;
  });
  console.log(questions)
})

scraper()
