const User = require('mongoose').model('User');

module.exports = () => {
    User.findOne({ username: 'user' }).then(user => {
        if (!user) {
            const encryption = require('../utilities/encryption');
            const user = {
                '_id': '5b46164fe68d540d5826fea8',
                'username': 'user',
                'password': 'password'
            };
            user.salt = encryption.generateSalt();
            user.password = encryption.generateHashedPassword(user.salt, user.password);
            User.create(user).then(() => {
                console.log('Seeded admin user');
            });
        }
    });
};
