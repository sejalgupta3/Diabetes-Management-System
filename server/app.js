
var express = require('express');
var path = require('path');
var server = require('./app');
var app = express();
var http = require('http')

var patient = require('./routes/patient');
var doctor = require('./routes/doctor');
var db = require('./db')
var bodyParser = require('body-parser');
var databaseName = 'dms';

app.use(bodyParser());
app.set('port', process.env.PORT || 9000);
// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use('/patient', patient);
app.use('/doctor', doctor);

app.post('/socketEmit', function(req, res) {
    var id =req.param("id");
    var name = req.param("name");
    if(connection){
        io.emit('chat message', { id : id,name :name});
        res.end("Success");
        res.send();
    }else{
        console.log('No client connected');
    }
});

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
db.connect('mongodb://52.38.69.56:27017/'+databaseName, function(err) {
  console.log("successs");
    if (err) {
        console.log(err);
        process.exit(1);
    }
})

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io')(server);
// socket.io demo

io.on('connection', function(socket){
	console.log("connection establised");
    connection = true;
})


module.exports = app;
