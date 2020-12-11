const mongoose = require('mongoose');
const Picture = require('./picture.model').Picture;

const DB_URI = "mongodb+srv://EzzAldin:Naruto74@cluster0.cufwz.mongodb.net/GalleryApp?retryWrites=true&w=majority";


const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    image: {
        type: String,
        default: 'Naruto Wallpapers.jpg'
    },
    pictures: [{
        type: String,
        ref: 'Picture'
    }]
});

const User = mongoose.model('User', userSchema);

exports.User = User;

exports.getUserData = async (id, data) => {
    try {
        mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        const user = await User.findOne({_id: id});
        const { picture, name } = data;
        let newPic = await new Picture({
            picture,
            name,
            user: id
        });
        await newPic.save();
        user.pictures.push(picture, name);
        await user.save();
        mongoose.disconnect();
        return ;
    } catch (error) {
        mongoose.disconnect();
        throw Error(error);
    }
};

