const puppeteer = require('puppeteer');
const fs = require('fs');

const scraper = (async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.leetcode.com/problemset/all');
  await page.waitForSelector('select.form-control', { timeout: 10000 });
  await page.select('select.form-control', '9007199254740991');

  const questions = await page.evaluate(() => {
    const questions = [];
    const questionRows = Array.from(document.getElementsByClassName('reactable-data')[0].rows, tr => tr);

    questionRows.forEach((questionRow) => {
      const questionRowElements = Array.from(questionRow.getElementsByTagName('td'), td => td);
      const questionDescriptions = Array.from(questionRowElements[2].getElementsByTagName('a'), a => a)[0];
      const questionUrl = questionDescriptions.href;
      if (questionUrl.startsWith("https://leetcode.com/problems/")) {
        const title = questionDescriptions.innerText;
        const index = questionRowElements[1].innerText;
        const difficulty = questionRowElements[5].innerText;

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
})

scraper()
