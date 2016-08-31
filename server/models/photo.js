const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  url: {type: String, required: true},
  createdAt: {type: Date, required: true, default: Date.now}
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
