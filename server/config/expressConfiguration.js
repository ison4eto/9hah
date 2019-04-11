const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const auth = require('./auth');

module.exports = (app) => {
    // Set up request logging for development environment
    app.use(morgan('dev'));

    // Set up body parser
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Allow Cross-Origin Resource Sharing
    app.use(cors());

    app.use((req, res, next) => {
        if (req.headers['authorization']) {
            req.user = auth.decodeToken(req.headers['authorization']);
        }
        next();
    });

    require('./routes')(app);
};
