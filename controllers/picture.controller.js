const pictureModel = require('../models/picture.model');


exports.getPictureById = (req, res) => {
    const id = req.params.id;
    pictureModel
        .getPictureById(id)
        .then(pictures => {
            res.render("picture", {
                pictures: pictures,
                isUser: req.session.userId,
                pageTitle: pictures.name
            })
        })
        .catch(err => {
            res.redirect("/error");
            console.log(err);
        });
        
};