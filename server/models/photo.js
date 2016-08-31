const BUCKET_NAME = 'danny-epic-fail';
const AWS_URL_BASE = 'https://s3-us-west-1.amazonaws.com'

const mongoose = require('mongoose');
const AWS = require('aws-sdk');

const uuid = require('uuid');
const path = require('path');

const s3 = new AWS.S3();

const photoSchema = new mongoose.Schema({
  name: {type: String, required: true},
  url: {type: String, required: true},
  createdAt: {type: Date, required: true, default: Date.now}
});

photoSchema.statics.upload = function(fileObj, cb) {
  console.log ('fileObj:', fileObj);
  let { originalname, buffer } = fileObj;

  let Key = uuid() + path.extname(originalname);

  let params = {
    Bucket: BUCKET_NAME,
    Key,
    ACL: 'public-read',
    Body: buffer
  };

  s3.putObject(params, (err, result) => {
    if (err) return cb(err);

    let url = `${AWS_URL_BASE}/${BUCKET_NAME}/${Key}`;

    this.create({ name: originalname, url }, cb);
  })
}

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
