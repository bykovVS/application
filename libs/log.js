// Logger

var winston = require('winston');
process.env.NODE_ENV = 'development';
var env = process.env.NODE_ENV;

function getLogger(module) {
    var path = module.filename.split('\\').slice(-2).join('/');
    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                level: env == 'development' ? 'debug' : 'error',
                showLevel: true,
                colorize: true,
                label: path
            })
        ]
    });
}

module.exports = getLogger;