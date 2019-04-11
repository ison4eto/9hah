const jwt = require('jsonwebtoken');
const CONSTANTS = require('../utilities/constants');

let validateToken = (value, callback) => {
    let data = value.split(' ');
    if (data.length !== 2) {
        callback(null);
        return;
    }
    let token = data[1];
    jwt.verify(token, CONSTANTS.SECRET, (err, data) => {
        if (err) {
            console.log(err);
            callback(null);
            return;
        }
        callback(data);
    });
};

let decodeToken = (value) => {
    let data = value.split(' ');
    if (data.length !== 2) {
        return null;
    }
    let token = data[1];
    let authData = jwt.verify(token, CONSTANTS.SECRET);
    if (!authData) {
        return null;
    }
    return authData;
};

module.exports.UserRoute = (req, res, next) => {
    let authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
        res.sendStatus(403);
        return;
    }
    validateToken(authorizationHeader, (token) => {
        if (!token) {
            res.sendStatus(403);
            return;
        }
        next();
    });
};

/*module.exports.AdminRoute = (req, res, next) => {
  let authorizationHeader = req.headers['authorization'];
  if (!authorizationHeader) {
    res.sendStatus(403);
    return;
  }
  validateToken(authorizationHeader, (token) => {
    if (token === null) {
      res.sendStatus(403);
      return;
    }
    if (!token.isAdmin) {
      res.sendStatus(401);
      return;
    }
    next();
  });
};*/

module.exports.decodeToken = decodeToken;
