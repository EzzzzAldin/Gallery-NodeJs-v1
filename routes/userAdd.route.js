const router = require('express').Router();
const bodyParser = require('body-parser');

// Init Express Validator
const check = require('express-validator').check;
// Init Module multer To work Form type multipart
const multer = require('multer');

const authGuard = require('./guards/auth.guard');
const userAddController = require('../controllers/userAdd.controller');

router.get('/add', authGuard.isAuth, userAddController.getAdd);

router.post('/add', authGuard.isAuth, bodyParser.urlencoded({extended: true}),
multer({
    storage: multer.diskStorage({
       //  Propartiy to location upload
       destination: (req, file, cb) => {
           // Name Location upload Images
           cb(null, 'images');
       },
       filename: (req, file, cb) => {
           // To Show Picture in Files Images It is not encrypted or duplicated
           cb(null, Date.now() + '-' + file.originalname)
       }
    })
}).single('picture'),
    userAddController.postAdd
)



module.exports = router;
