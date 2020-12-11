const userModel = require('../models/user.model');

const validationResult = require('express-validator').validationResult;

exports.getAdd = (req, res) => {
    res.render('add-picture', {
        pageTitle: 'Add Picture',
        validationErrors: req.flash('validationErrors'),
        isUser: true,
        pictureAdded: req.flash('added')[0]
    });
};

exports.postAdd = (req, res) => {
    // Check If not Found Errors
    if( validationResult(req).isEmpty()) {
        // Get User Id
        const id = req.session.userId
        // Get Picture In form
        req.body.picture = req.file.filename;
        userModel.getUserData(id, req.body).then(() => {
                req.flash('added', true);
                res.redirect('/add')
            })
            .catch(err => {
                console.log(err);
                res.redirect('/');
            })
    } else {
        req.flash('validationErrors', validationResult(req).array());
        res.redirect('/signup');
    }
};