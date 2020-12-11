const pictureModel = require('../models/picture.model');

exports.getHome = (req,res) => {
    pictureModel.getAllPictures().then(pictures => {
        res.render('home', {
            pictures: pictures,
            validationErrors: req.flash('validationErrors'),
            pageTitle: 'Home',
            isUser: req.session.userId
        });
    }).catch(err => console.log(err));
};

exports.getSearch = (req, res) => {
    if (!req.query.name) {
        res.render('search', {
            pageTitle: 'Search Photos',
            isUser: req.session.userId,
            pictures: null,
            searchMode: false
        })
    } else {
        pictureModel.getPictures({ name: {
            $regex: new RegExp('^' + req.query.name, 'i')
        }}).then(pictures => {
            res.render('search', {
                pageTitle: 'Photos',
                isUser: req.session.userId,
                pictures: pictures,
                searchMode: true
            })
        }).catch(err => {
            res.redirect("/error");
            console.log(err);
        })
    }
};