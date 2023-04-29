const express = require('express');
const wakingUpServerController = require('../controllers/wakingUpServerController');

const router = express.Router();

router.route('/').get(wakingUpServerController.wakeUp);

module.exports = router;
