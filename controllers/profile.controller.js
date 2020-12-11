const userModel = require('../models/user.model');
const pictureModel = require('../models/picture.model');

exports.getProfile = (req, res) => {
    // Get User Id
    const id = req.params.id;
    // If I Enter My Profile
    if (!id) return res.redirect('/profile/' + req.session.userId)
    pictureModel.getUser(id).then( pictures => {
        res.render('profile', {
            pageTitle: pictures[0].user.username,
            isUser: true,
            user: req.session.userId,
            pictures: pictures
        })
    })
};