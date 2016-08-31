const express = require('express');
const router = express.Router();

router.use('/albums', require('./albums'));
router.use('/photos', require('./photos'));

module.exports = router;
