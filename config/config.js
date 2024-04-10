var path = require('path')
var fs = require('fs')
require("dotenv").config()
var config = JSON.parse(fs.readFileSync(path.join(__dirname, "/config.json"), 'utf8'))
var CONFIG = {}
CONFIG.ENV = (process.env.NODE_ENV || 'development');
CONFIG.PORT = (process.env.VCAP_APP_PORT || config.port);
CONFIG.DB_URL = 'mongodb://localhost:27017/futurebridge' ;
CONFIG.SITE_URL = process.env.SITE_URL
module.exports = CONFIG
