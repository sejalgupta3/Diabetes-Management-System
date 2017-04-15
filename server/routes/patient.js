var express = require('express');
var router = express.Router();
var db = require('../db');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* Add/Update Patient Activities. */
router.post( '/activites', function( req, res, next ) {
  var collection = db.get().collection('activities'),
  patientId = req.body.patientId,
  activityData = req.body.activity;

  db.getRecord(collection, {patientId: patientId}, function(document) {
    if ( document != null ) {
      db.updateRecord( collection,
        { patientId: patientId },
        { $addToSet: {activity: {$each: activityData}}}, function(){
        res.send('Success');
      });
    } else {
      db.addRecord( collection, req.body, function(){
        res.send('Success')
      });
    }
  });
});

router.get( '/latestActivity', function(req, res, next ) {
  var json = JSON.stringify({
    date: '04/12/2017',
    steps: '5000'
  });
  res.setHeader('Content-Type', 'application/json');
  res.send(json);
});

router.get( '/latestGlucose', function(req, res, next ) {
  var json = JSON.stringify({
    date: '04/12/2017',
    value: '10.0',
    units: 'mmol/L',
    time: 'Before Lunch'
  });
  res.setHeader('Content-Type', 'application/json');
  res.send(json);
});

router.get( '/latestCaloriesBurned', function(req, res, next ) {
  var json = JSON.stringify({
    date: '04/12/2017',
    calories: '1000',
    units: 'kcal'
  });
  res.setHeader('Content-Type', 'application/json');
  res.send(json);
});

router.get( '/latestCaloriesIntake', function(req, res, next ) {
  var json = JSON.stringify({
    date: '04/12/2017',
    calories: '300',
    units: 'kcal'
  });
  res.setHeader('Content-Type', 'application/json');
  res.send(json);
});

module.exports = router;
