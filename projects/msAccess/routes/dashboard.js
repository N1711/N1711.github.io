const express = require('express');
const router = express.Router();
const dashController = require('../controllers/dashController');

router.get('/dash', dashController.connect);

module.exports = router;
