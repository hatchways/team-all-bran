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
    return questions
  });

  for (let question of questions) {
    await page.goto(question.url)
    if (!page.url().startsWith("https://leetcode.com/accounts/login/?next=/problems")) {
      console.log("Currently scraping: #" + question.index + " - " + page.url());
      await page.waitForSelector('.question-content__JfgR', { timeout: 10000 });
      const description = await page.evaluate(() => {
        const questionContentDivs = Array.from(document.getElementsByClassName('question-content__JfgR'), q => q.innerText);
        return questionContentDivs[0]
      });
      question.description = description
    } else {
      continue
    }
  };

  await browser.close();
})

scraper()
