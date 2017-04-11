var express = require('express');
var router = express.Router();
var db = require('../db');

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

module.exports = router;
