const router =require('express').Router();

const authGuard = require('./guards/auth.guard');
const profileController = require('../controllers/profile.controller');

router.get('/profile', authGuard.isAuth, profileController.getProfile);
router.get('/profile/:id', authGuard.isAuth, profileController.getProfile);

module.exports = router;