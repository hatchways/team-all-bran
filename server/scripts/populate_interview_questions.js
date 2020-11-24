const mongoose = require('mongoose');
const Question = require('../models/Question');

var fs = require('fs');
const e = require('express');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/all_bran", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB Connected!');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

var populate = (async () => {
  const questions = await JSON.parse(fs.readFileSync('leetcode-problems.json', 'utf-8'));

  for (let question of questions) {
    const { index, url, title, difficulty, description } = question;

    try {
      await new Question({ index, url, title, difficulty, description }).save();
    } catch (e) {
      console.error(e);
    }
  };
  console.log("All questions saved to db");
  mongoose.disconnect();
})

connectDB();
populate()
