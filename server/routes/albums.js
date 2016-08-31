const express = require('express');
const router = express.Router();

const Album = require('../models/album');

router.route('/')
  .get((req, res) => {
    Album.find({}, (err, albums) => {
      res.status(err ? 400: 200).send(err || albums);
    })
  })
  .post((req, res) => {
    Album.create(req.body, (err, album) => {
      res.status(err ? 400: 200).send(err || album);
    })
  });

router.get('/:id', (req, res) => {
  Album.findById(req.params.id, (err, album) => {
    if (err || !album) {
      return res.status(400).send(err || 'Album not found.');
    }
    res.send(album);
  }).populate('photos')
})

router.delete('/:id', (req, res) => {
  Album.findByIdAndRemove(req.params.id, (err, album) => {
    if (err || !album) {
      return res.status(400).send(err || 'Album was not deleted.');
    }
    res.send(album);
  })
})

router.put('/:id', (req, res) => {
  Album.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, album) => {
    if (err || !album) {
      return res.status(400).send(err || 'Album was not updated.');
    }
    res.send(album);
  })
})

router.put('/:albumId/addPhoto/:photoId', (req, res) => {
  Album.findById(req.params.albumId, (err, album) => {
    if (err || !album) {
      return res.status(400).send(err || 'Album not found.');
    }

    let photoId = req.params.photoId
    album.photos.push(photoId);
    album.save((err, savedAlbum) => {
      res.status(err ? 400: 200).send(err || savedAlbum);
    })
  })
})

module.exports = router;
