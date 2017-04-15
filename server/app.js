
var express = require('express');
var path = require('path');

var app = express();

var patient = require('./routes/patient');
var doctor = require('./routes/doctor');
var db = require('./db')
var bodyParser = require('body-parser');
var databaseName = 'dms';

app.use(bodyParser());

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));


app.use('/patient', patient);
app.use('/doctor', doctor);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

// Connect to Mongo on start
db.connect('mongodb://localhost:27017/'+databaseName, function(err) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
})

module.exports = app;
