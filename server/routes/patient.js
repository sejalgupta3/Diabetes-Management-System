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
  activityData = req.body.activity,
  activityObject = [{
	  "StepCount" : activityData[0].StepCount,
		"WalkingRunningDistance" : activityData[0].WalkingRunningDistance,
		"Date" : new Date(activityData[0].Date)
	}];
  db.getRecord(collection, {patientId: patientId}, function(document) {
    if ( document != null ) {
      db.updateRecord( collection,
        { patientId: patientId },
        { $addToSet: {activity: {$each: activityObject}}}, function(){
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
        'data' : req.body.CalorieBurned,
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
        'data' : req.body.calorieIntake,
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

router.post( '/profileInfo', function( req, res, next ) {
  console.log(req.body);
  var collection = db.get().collection('profileInfo'),
  patientId = req.body.patientId;
  object = {
      "height" : req.body.height,
  		"heightUnit" : req.body.heightUnit,
  		"weight" : req.body.weight,
      "weightUnit" : req.body.weightUnit,
      "bmi": req.body.bmi,
      "bmiUnit": req.body.bmiUnit
	};
  console.log("object"+object);
  db.getRecord(collection, {patientId: patientId}, function(document) {
    if ( document != null ) {
      db.updateRecord( collection,
        { patientId: patientId },
        {"patientId" : patientId, "patientInfo": object}, function(){
        res.send('Success');
      });
    } else {
      db.addRecord( collection, {"patientId" : req.body.patientId, "patientInfo": object}, function(){
        res.send('Success')
      });
    }
  });
});

function custom_sort(a, b) {
  return new Date(a.date).getTime() - new Date(b.date).getTime();
}

function custom_sort_diabetes(a, b) {
  return new Date(a.Date).getTime() - new Date(b.Date).getTime();
}

router.get( '/activities', function(req, res, next ) {
  var collection = db.get().collection('activities');
  db.getRecord(collection, {patientId: parseInt(req.query.patientId)}, function(document) {
    if ( document != null ) {
      var record = document.activity;
      record = record.sort(custom_sort_diabetes);
      res.setHeader('Content-Type', 'application/json');
      res.send({"activity":record});
    }else{
      res.send('No data');
    }
  });
});

router.get( '/patientInfo', function(req, res, next ) {
  console.log(req.query.patientId);
  var collection = db.get().collection('profileInfo');
  db.getRecord(collection, {patientId: parseInt(req.query.patientId)}, function(document) {
    console.log(document);
    if ( document != null ) {
      var record = document;
      res.setHeader('Content-Type', 'application/json');
      res.send({"patientInfo":record.patientInfo});
    }else{
      res.send('No data');
    }
  });
});

router.get( '/glucose', function(req, res, next ) {
  var collection = db.get().collection('glucose');
  db.getRecord(collection, {patientId: parseInt(req.query.patientId)}, function(document) {
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
  db.getRecord(collection, {patientId: parseInt(req.query.patientId)}, function(document) {
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
  db.getRecord(collection, {patientId: parseInt(req.query.patientId)}, function(document) {
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
  db.getRecord(collection, {patientId:parseInt(req.query.patientId)}, function(document) {
    if ( document != null ) {
      var record = document.activity;
      record = record.sort(custom_sort_diabetes);
      res.setHeader('Content-Type', 'application/json');
      res.send(record[0]);
    } else {
      res.send('No data');
    }
  });
});

router.get( '/latestGlucose', function(req, res, next ) {
  var collection = db.get().collection('glucose');
  db.getRecord(collection, {patientId: parseInt(req.query.patientId)}, function(document) {
    if ( document != null ) {
      var record = document.glucose;
      record = record.sort(custom_sort);
      res.setHeader('Content-Type', 'application/json');
      res.send({"glucose":record[record.length-1]});
    } else {
      res.send('No data');
    }
  });
});

router.get( '/latestCaloriesBurned', function(req, res, next ) {
  var collection = db.get().collection('caloriesBurned');
  db.getRecord(collection, {patientId: parseInt(req.query.patientId)}, function(document) {
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
  db.getRecord(collection, {patientId: parseInt(req.query.patientId)}, function(document) {
    if ( document != null ) {
      var record = document.calories;
      record = record.sort(custom_sort);
      res.setHeader('Content-Type', 'application/json');
      res.send({"caloriesIntake":record[record.length-1]});
    } else {
      res.send('No data');
    }
  });
});

router.get( '/calories', function(req, res, next) {
  var dateReq =  new Date(req.query.date),
  dateReqSt = (parseInt(dateReq.getMonth())+1) +'-'+dateReq.getDate()+'-'+dateReq.getFullYear();
  var collectionB = db.get().collection('caloriesBurned');
  var collectionI = db.get().collection('caloriesIntake');
  var avgB = 0, avgI = 0;
  db.getRecord(collectionB, {patientId: parseInt(req.query.patientId)}, function(document) {
    if ( document != null ) {
      var recordB = document.calories;
      for(var i in recordB){
        var date = new Date(recordB[i].date);
        var dateString = (parseInt(date.getMonth())+1) +'-'+date.getDate()+'-'+date.getFullYear();
        if(dateString == dateReqSt){
          avgB = avgB + parseInt(recordB[i].data);
        }
      }
      db.getRecord(collectionI, {patientId: parseInt(req.query.patientId)}, function(document) {
        if ( document != null ) {
          var recordI = document.calories;
          for(var i in recordI){
            var date = new Date(recordI[i].date);
            var dateString = (parseInt(date.getMonth())+1)+'-'+date.getDate()+'-'+date.getFullYear();
            if(dateString == dateReqSt){
              avgI = avgI + parseInt(recordI[i].data);
            }
          }
          res.setHeader('Content-Type', 'application/json');
          res.send({"calories":{burned:avgB,intake:avgI}});
        } else {
          res.send('No data');
        }
      });
    } else {
      res.send('No data');
    }
  });
});

module.exports = router;
