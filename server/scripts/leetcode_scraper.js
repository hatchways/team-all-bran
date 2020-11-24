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
