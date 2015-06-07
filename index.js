/*jshint unused:false*/
var express = require('express');

var config = require('./config.json');

// express.js application
var app = express();

// start the HTTP server
var server = app.listen(config.port, function() {
    "use strict";
    var host = server.address().address;
    var port = server.address().port;
    console.log('tlks.io api listening at http://%s:%s', host, port);
});
