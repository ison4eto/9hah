
const environment = process.env.NODE_ENV || 'dev';
const config = require('./config/configuration')[environment];

const express = require('express');

const port = config.port;

let app = express();

require('./config/mongooseConfiguration')(config);
require('./config/expressConfiguration')(app);

// Start server
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
