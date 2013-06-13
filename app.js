//Load configurations
var env = process.env.NODE_ENV || 'development';
var config = require('./config/settings')[env];

//Objects
var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');

//MongoDB
mongoose.connect(config.db);

//Framework
var express = require('express');
var app = module.exports = express();
require('./config/express.js')(app, express);

//Routes
require('./config/routes')(app);

//Start server
http.createServer(app).listen(app.get('port'), function() {
	
    console.log("Server listening on port " + app.get('port'));
    
});