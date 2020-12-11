const mongoose = require('mongoose');

const DB_URI = "mongodb+srv://EzzAldin:Naruto74@cluster0.cufwz.mongodb.net/GalleryApp?retryWrites=true&w=majority";

const pictureSchema = new mongoose.Schema({
    picture: {
        type: String,
        required: true,
        trim: true,
        
    },
    name: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
});

const Picture = mongoose.model('Picture', pictureSchema);

exports.Picture = Picture;

exports.getAllPictures = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
            return Picture.find({});
        }).then( pictures => {
            mongoose.disconnect();
            resolve(pictures);
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
};

exports.getPictureById = async id => {
    try {
        // DB connect
        mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        // Find Data Picture
        const pictures = await Picture.findOne({_id: id}).populate({
            path: 'user',
            model: 'User',
            select: 'username image'
        });
        mongoose.disconnect();
        return pictures ;
    } catch (error) {
        mongoose.disconnect();
        throw Error(error);
    }
};

exports.getUser = async userId => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => {
                return Picture.find(
                    { user: userId },
                ).populate({
                            path: 'user',
                            model: 'User',
                            select: 'username image'
                        });
            })
            .then(pictures => {
                mongoose.disconnect();
                resolve(pictures);
            })
            .catch(err => {
                mongoose.disconnect();
                reject(err);
            });
    });
};

exports.getPictures = async query => {
    // Use Try And Catch to Know if Found Error
    try {
        // DB connect
        await mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        let pictures = await Picture.find(query);
        return pictures;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
};