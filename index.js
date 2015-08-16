/*jshint unused:false*/
var express = require('express');
var morgan = require('morgan');
var fs = require('fs');
var FileStreamRotator = require('file-stream-rotator');

var config = require('./config.json');
var pkg = require('./package.json');

// express.js application
var app = express();

var logDirectory = __dirname + '/log';
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
    filename: logDirectory + '/access.%DATE%.log',
    frequency: 'daily',
    verbose: false,
    date_format: "YYYY-MM-DD"
});

// setup the logger
app.use(morgan('combined', {
    stream: accessLogStream
}));

// express.js router class
var router = express.Router();

router.get('/teapot', function(req, res) {
    res.status(418);
    res.send('I\'m a teapot!');
});

router.get('/version', function(req, res) {
    res.send(pkg.version);
});

router.get('/talks', function(req, res) {

});

app.use('/', router);

// start the HTTP server
var server = app.listen(config.port, function() {
    "use strict";
    var host = server.address().address;
    var port = server.address().port;
    console.log('tlks.io api listening at http://%s:%s', host, port);
});
