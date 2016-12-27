var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Importing configurations
var config = require('./config/config');

// Connecting to mongodb
var db = mongoose.connect(config.db.url, function (err) {
    if (err) {
        console.error('Error connecting to database');
        console.error(err);
    }
});

// Configure express app
var app = express();
var port = process.env.PORT || 8081;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import routes
var courseRouter = require('./routes/courseRoutes')();

// Configure routes
app.use('/api/courses', courseRouter);


// Start app
app.listen(port, function () {
    console.info('Running Training Manager API on Port: ' + port);
});
