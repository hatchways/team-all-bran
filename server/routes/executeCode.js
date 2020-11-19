const express = require('express');
const axios = require('axios');
const router = express.Router();

let axiosConfig = {
  method: 'post',
  url: 'https://run.glot.io/languages',
  headers: {
    Authorization: 'Token c70fae98-b913-44ba-b486-ddecb2d4e85c',
    'Content-type': 'application/json',
  },
};

router.get('/', (req, res) => {
  let code = req.body.code;
  let language = req.body.language;

  //console.log(`${language} - ${code}`);

  axiosConfig.url = `${axiosConfig.url}/${language}/latest`;

  //console.log(axiosConfig.url);

  //   let data = { files: [] };
  //   let fileData = {};
  //   switch (language) {
  //     case 'javascript':
  //       fileData.name = 'app,js';
  //       break;
  //     case 'python':
  //       fileData.name = 'main.py';
  //       break;
  //   }
  //   fileData.fileContent = code;
  //   data.files.push(fileData);

  //   axiosConfig.data = JSON.stringify(data);

  //console.log(axiosConfig);

  var axios = require('axios');
  var data = JSON.stringify({
    files: [
      { name: 'test.js', content: 'console.log(123); console.log(123);' },
    ],
  });

  var config = {
    method: 'post',
    url: `https://run.glot.io/languages/${language}/latest`,
    headers: {
      Authorization: 'Token c70fae98-b913-44ba-b486-ddecb2d4e85c',
      'Content-type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  //   axios(axiosConfig)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });
});

// Test errors
router.use(function (err, req, res, next) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('404');
  }
});

module.exports = router;
