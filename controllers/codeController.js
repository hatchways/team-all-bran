const axios = require('axios');

const executeCode = (req, res) => {
  let code = req.body.code;
  let language = req.body.language;

  let fileName = '';

  switch (language) {
    case 'javascript':
      fileName = 'app.js';
      break;
    case 'python':
      fileName = 'main.py';
      break;
  }

  let data = JSON.stringify({
    files: [{ name: fileName, content: code }],
  });

  let config = {
    method: 'post',
    url: `https://run.glot.io/languages/${language}/latest`,
    headers: {
      Authorization: process.env.GLOT_TOKEN,
      'Content-type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      let { stdout, stderr, error } = response.data;
      let codeOutput = stdout + stderr + error;
      res.json(codeOutput);
    })
    .catch(function (error) {
      console.error(error.message);
    });
};

module.exports = { executeCode };
