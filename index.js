/*jshint unused:false*/
var express = require('express');
var morgan = require('morgan');
var fs = require('fs');
var FileStreamRotator = require('file-stream-rotator');

var libtlks = require('libtlks');

var config = require('./config.json');
var pkg = require('./package.json');

// express.js application
var app = express();

var logDirectory = __dirname + '/log';

console.log(logDirectory);

// ensure log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
  filename: logDirectory + '/access.%DATE%.log',
  frequency: 'daily',
  verbose: false,
  date_format: 'YYYY-MM-DD',
});

// setup the logger
app.use(morgan('combined', {
  stream: accessLogStream,
}));

// express.js router class
var router = express.Router();

/**
 * Route /teapot
 */
router.get('/teapot', function (req, res) {
  res.status(418);
  res.send('I\'m a teapot!');
});

/**
 * GET /version
 */
router.get('/version', function (req, res) {
  res.send(pkg.version);
});

/**
 * GET /talks
 */
router.get('/talks', function (req, res) {
  var limit = 25;
  libtlks.talk.latest(config.mongodb, limit, null, function (err, talks) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    res.json(talks);
  });
});

/**
 * GET /talks/:id
 */
router.get('/talks/id/:id', function (req, res) {
    var id = req.params.id;
    libtlks.talk.get(config.mongodb, id, function(err, docs) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        if (docs === null) {
            var context = {
                message: 'Talk ID not found.',
                error: 404,
            };
            res.json(404, context);
        }
        res.json(docs);
    });
});

/**
 * GET /talks/slug/:slug
 */
router.get('/talks/slug/:slug', function(req, res) {
    var slug = req.params.slug;
    libtlks.talk.getBySlug(config.mongodb, slug, function(err, docs) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        if (docs === null) {
            var context = {
                message: "Talk Slug not found.",
                error: 404,
            };
            res.json(404, context);
        }
        res.json(docs[0]);
    });
});

app.use('/', router);

// start the HTTP server
var server = app.listen(config.api.port, function() {
    "use strict";
    var host = server.address().address;
    var port = server.address().port;
    console.log('tlks.io api listening at http://%s:%s', host, config.api.port);
});
