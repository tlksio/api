/*jshint unused:false*/
var express = require('express');

var config = require('./config.json');

// express.js application
var app = express();

var router = express.Router();

router.get('/teapot', function(req, res) {
    res.status(418);
    res.send('I\'m a teapot!');
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
