const express = require('express');
const router = express.Router();

const Photo = require('../models/photo');

router.route('/')
  .get((req, res) => {
    Photo.find({}, (err, photos) => {
      res.status(err ? 400 : 200).send(err || photos);
    });
  })
  .post((req, res) => {
    Photo.create(req.body, (err, newPhoto) => {
      res.status(err ? 400 : 200).send(err || newPhoto);
    });
  });

router.route('/:id')
  .get((req, res) => {
    Photo.findById(req.params.id, (err, photo) => {
      res.status(err ? 400 : 200).send(err || photo);
    });
  })
  .delete((req, res) => {
    Photo.findByIdAndRemove(req.params.id, err => {
      res.status(err ? 400 : 200).send(err || req.params.id);
    })
  })
  .put((req, res) => {
    Photo.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, photo) => {
      if(err) {
        return res.status(400).send(err);
      }

      Photo.find({}, (err, photos) => {
        res.status(err ? 400 : 200).send(err || photos);
      });
    });
  })

module.exports = router;
