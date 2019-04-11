const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = (config) => {
    require('../models/User');
    require('../models/Meme');
    require('../models/Comment');
    require('../models/Category'); 

    mongoose.connect(config.connectionString, { useNewUrlParser: true }, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Mongoose Ready!');
        require('./initialSetup')(); // Seed admin user if one does not exist
    });
};
