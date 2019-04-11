const jwt = require('jsonwebtoken');
const encryption = require('../utilities/encryption');
const User = require('../models/User');
const CONSTANTS = require('../utilities/constants');

let serializeUser = (user) => {
    let salt = encryption.generateSalt();
    user.salt = salt;
    user.password = encryption.generateHashedPassword(salt, user.password);
    return user;
};

let authenticate = (password, user) => {
    if (!user) {
        return false;
    }
    let hashedPassword = encryption.generateHashedPassword(user.salt, password);

    if (hashedPassword === user.password) {
        return true;
    }
    return false;
};

let loginUser = (user, res) => {
    jwt.sign({
        username: user.username,
        id: user._id
    }, CONSTANTS.SECRET, { expiresIn: '7d' }, (err, token) => {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        }
        let value = 'Bearer ' + token;
        let result = {};
        result.username = user.username;
        result.Authentication = value;
        res.json(result);
    });
};

module.exports.registerPost = (req, res) => {
    let user = {
        username: req.body.username,
        password: req.body.password
    };
    user = serializeUser(user);
    User.count({ username: user.username }, (err, count) => {
        if (err) {
            console.log(err);
            res.sendStatus(409);
            return;
        }
        if (count > 0) {
            res.sendStatus(409);
            return;
        }
        User.create(user).then(newUser => {
            loginUser(newUser, res);
        });
    });
};

module.exports.loginPost = (req, res) => {
    let user = {
        username: req.body.username,
        password: req.body.password
    };
    User.findOne({ username: user.username }, (err, foundUser) => {
        if (err || !foundUser) {
            res.sendStatus(404);
            return;
        }
        if (!authenticate(user.password, foundUser)) {
            res.sendStatus(400);
            return;
        }
        loginUser(foundUser, res);
    });
};
