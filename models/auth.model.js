const mongoose = require('mongoose');
const DB_URI = "mongodb+srv://EzzAldin:Naruto74@cluster0.cufwz.mongodb.net/GalleryApp?retryWrites=true&w=majority";

const User = require('./user.model').User;

const bcrypt = require('bcrypt');

exports.createNewUser = (username, email, password, image) => {
    return new Promise((resolve, reject) => {
        // DB Connect
        mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
            // Check Email is Exits 
            return User.findOne({email: email})
        }).then(user => {
            if(user) {
                // if email Is Find 
                mongoose.disconnect();
                reject('Email is used');
            } else {
                // If email is not Find in DB and Locked Password
                return bcrypt.hash(password, 10);
            }
        }).then(hashedPassword => {
            // Save new User Data in collection user in DB 
            let user = new User ({
                username: username,
                email: email,
                password: hashedPassword,
                image: image
            })
            return user.save();
        }).then(() => {
            mongoose.disconnect();
            resolve();
        }).catch(err => {
            reject(err);
        })
    });
};

exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        // DB Connect
        mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
            // Check Email is Exits 
            return User.findOne({email: email})
        }).then(user => {
            if (!user) {
                mongoose.disconnect();
                reject('there is no user matches this email');
            } else {
                // Compare Password 
                bcrypt.compare( password, user.password).then( same => {
                    // If Password is not Same Password in DB
                    if (!same) {
                        mongoose.disconnect();
                        reject('the Password is incorrect');
                    } else {
                        mongoose.disconnect();
                        resolve(user);
                    }
                });
            }
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    });
};