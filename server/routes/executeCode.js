const express = require('express');
const axios = require('axios');
const router = express.Router();

const apiMethod = (req, res) => {
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
      Authorization: process.env.glotToken,
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
      console.log(error);
    });
};

router.get('/', apiMethod);

module.exports = router;
