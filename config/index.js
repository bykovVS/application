// Connect
var nconf = require('nconf');
var path = require('path');

// Connect the config file json

nconf.argv()
   .env()
   .file({ file: path.join(__dirname, 'config.json')});
          
module.exports = nconf;