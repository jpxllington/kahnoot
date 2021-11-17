const express = require('express');
const router = express.Router();
const leaderController = require('../controllers')

router.get('/', leaderController.index)
router.get('/:name', leaderController.show)
router.post('/', leaderController.create)

module.exports = router;