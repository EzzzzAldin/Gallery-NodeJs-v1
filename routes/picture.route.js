const router = require('express').Router();
const pictureController = require('../controllers/picture.controller');

router.get('/:id', pictureController.getPictureById);

module.exports = router;