const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.S3_ACCESS_SECRET,
  accessKeyId: process.env.S3_ACCESS_KEY,
  region: 'us-east-2',
});

const s3 = new aws.S3();

const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(
      new Error('Invalid file type, only JPEG and PNG is allowed!'),
      false
    );
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'mock-interview-profile-pictures', //Bucket Name
    metadata: function (req, file, callback) {
      callback(null, { fieldName: 'TESTING_METADATA' });
    },
    key: function (req, file, callback) {
      callback(null, Date.now().toString());
    },
  }),
});

module.exports = upload;
