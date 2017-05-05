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

router.post( '/glucose', function( req, res, next ) {
  var collection = db.get().collection('glucose'),
  patientId = req.body.patientId,
  glucoseObject = {
    'patientId' : patientId,
    'glucose' : [
      {
        'data' : req.body.glucose,
        'date' : req.body.ObservationDate,
        'unit' : req.body.unit
      }
    ]
  };
  db.getRecord(collection, {patientId: patientId}, function(document) {
    if ( document != null ) {
      db.updateRecord( collection,
        { patientId: patientId },
        { $addToSet: {glucose: {$each: glucoseObject.glucose}}}, function(){
        res.send('Success');
      });
    } else {
      db.addRecord( collection, glucoseObject, function(){
        res.send('Success')
      });
    }
  });
});

router.post( '/caloriesBurned', function( req, res, next ) {
  var collection = db.get().collection('caloriesBurned'),
  patientId = req.body.patientId;
  calorieObject = {
    'patientId' : patientId,
    'calories' : [
      {
        'data' : req.body.calories,
        'date' : req.body.ObservationDate,
        'unit' : req.body.unit
      }
    ]
  };
  db.getRecord(collection, {patientId: patientId}, function(document) {
    if ( document != null ) {
      db.updateRecord( collection,
        { patientId: patientId },
        { $addToSet: {calories: {$each: calorieObject.calories}}}, function(){
        res.send('Success');
      });
    } else {
      db.addRecord( collection, calorieObject, function(){
        res.send('Success')
      });
    }
  });
});

router.post( '/caloriesIntake', function( req, res, next ) {
  var collection = db.get().collection('caloriesIntake'),
  patientId = req.body.patientId;
  calorieObject = {
    'patientId' : patientId,
    'calories' : [
      {
        'data' : req.body.calories,
        'date' : req.body.ObservationDate,
        'unit' : req.body.unit
      }
    ]
  };
  db.getRecord(collection, {patientId: patientId}, function(document) {
    if ( document != null ) {
      db.updateRecord( collection,
        { patientId: patientId },
        { $addToSet: {calories: {$each: calorieObject.calories}}}, function(){
        res.send('Success');
      });
    } else {
      db.addRecord( collection, calorieObject, function(){
        res.send('Success')
      });
    }
  });
});

function custom_sort(a, b) {
  return new Date(a.date).getTime() - new Date(b.date).getTime();
}

router.get( '/activities', function(req, res, next ) {
  var collection = db.get().collection('activities');
  db.getRecord(collection, {patientId: 111}, function(document) {
    if ( document != null ) {
      var record = document.activity;
      record = record.sort(custom_sort);
      res.setHeader('Content-Type', 'application/json');
      res.send({"activity":record});
    }else{
      res.send('No data');
    }
  });
});

router.get( '/glucose', function(req, res, next ) {
  var collection = db.get().collection('glucose');
  db.getRecord(collection, {patientId: 111}, function(document) {
    if ( document != null ) {
      var record = document.glucose;
      record = record.sort(custom_sort);
      res.setHeader('Content-Type', 'application/json');
      res.send({"glucose":record});
    } else {
      res.send('No data');
    }
  });
});

router.get( '/caloriesBurned', function(req, res, next ) {
  var collection = db.get().collection('caloriesBurned');
  db.getRecord(collection, {patientId: 111}, function(document) {
    if ( document != null ) {
      var record = document.calories;
      record = record.sort(custom_sort);
      res.setHeader('Content-Type', 'application/json');
      res.send({"caloriesBurned":record});
    } else {
      res.send('No data');
    }
  });
});

router.get( '/caloriesIntake', function(req, res, next ) {
  var collection = db.get().collection('caloriesIntake');
  db.getRecord(collection, {patientId: 111}, function(document) {
    if ( document != null ) {
      var record = document.calories;
      record = record.sort(custom_sort);
      res.setHeader('Content-Type', 'application/json');
      res.send({"caloriesIntake":record});
    } else {
      res.send('No data');
    }
  });
});

router.get( '/latestActivity', function(req, res, next ) {
  var collection = db.get().collection('activities');
  db.getRecord(collection, {patientId: 111}, function(document) {
    if ( document != null ) {
      var record = document.activity;
      record = record.sort(custom_sort);
      res.setHeader('Content-Type', 'application/json');
      res.send(record[0]);
    } else {
      res.send('No data');
    }
  });
});

router.get( '/latestGlucose', function(req, res, next ) {
  var collection = db.get().collection('glucose');
  db.getRecord(collection, {patientId: 111}, function(document) {
    if ( document != null ) {
      var record = document.glucose;
      record = record.sort(custom_sort);
      res.setHeader('Content-Type', 'application/json');
      res.send({"glucose":record[0]});
    } else {
      res.send('No data');
    }
  });
});

router.get( '/latestCaloriesBurned', function(req, res, next ) {
  var collection = db.get().collection('caloriesBurned');
  db.getRecord(collection, {patientId: 111}, function(document) {
    if ( document != null ) {
      var record = document.calories;
      record = record.sort(custom_sort);
      res.setHeader('Content-Type', 'application/json');
      res.send({"caloriesBurned":record[record.length-1]});
    } else {
      res.send('No data');
    }
  });
});

router.get( '/latestCaloriesIntake', function(req, res, next ) {
  var collection = db.get().collection('caloriesIntake');
  db.getRecord(collection, {patientId: 111}, function(document) {
    if ( document != null ) {
      var record = document.calories;
      record = record.sort(custom_sort);
      console.log(record);
      res.setHeader('Content-Type', 'application/json');
      res.send({"caloriesIntake":record[record.length-1]});
    } else {
      res.send('No data');
    }
  });
});

module.exports = router;
