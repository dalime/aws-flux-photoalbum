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

photoSchema.pre('remove', function(next) {
  let id = this._id;
  let Key = this.s3_key;

  let params = {
    Bucket: BUCKET_NAME,
    Key
  };

  s3.deleteObject(params, (err, result) =>{
   if (err) return next(err)

    mongoose.model('Album').find({ photos: mongoose.Types.ObjectId(`${id}`) }, (err, albums) =>{
      let newAlbum = albums[0];
      console.log ('albums:', albums);

      newAlbum.photos = newAlbum.photos.filter(photo => photo.toString() !== id.toString())
      newAlbum.save(err =>{
        next();
      });
    })
  })
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
