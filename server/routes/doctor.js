var express = require('express');
var router = express.Router();
var db = require('../db');


router.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});


router.get('/searchPatient',function(req,res,next){
	var collection = db.get().collection('patientDetails');
	db.findRecordNoFilter(collection,function(document){
		if(document!=null){

			res.setHeader('Content-Type', 'application/json');
			res.send(((document)));
		}
	})
});

router.post('/searchPatientById', function(req,res,next){
	 patientId = req.body.data;
	 var collection = db.get().collection('patientDetails');
	 db.getRecord(collection, {fname: patientId}, function(document) {
		    if ( document != null ) {

		        res.send(document);
		        }
		  });
});

router.post('/loginCheck', function(req,res,next){
	patientDetails = req.body.data;
	var collection = db.get().collection('patientDetails');
 	db.getRecord(collection, {email: patientDetails.email}, function(document) {
    if ( document != null ) {
      res.send({"id":document.id, "name":document.fname});
    }
  });
});

router.get('/medicationsList', function(req,res,next){
	var collection = db.get().collection('ml');
	db.findRecordNoFilter(collection,function(document){
		if(document!=null){
			res.setHeader('Content-Type', 'application/json');
			res.send(document);
		}
	})
});

router.post('/patientMedications', function(req,res,next){
	var id = req.body.data;
	var collection = db.get().collection('patientMedications');
	 db.getRecord(collection, {pat_id:id}, function(document) {
		    if ( document != null ) {
		        res.send(JSON.stringify(document.items));
		        }
		  });
});


router.post('/removeMedications', function(req,res,next){
	var obj = req.body.data;
	var collection = db.get().collection('patientMedications');
	 db.updateRecord( collection,
		        { pat_id: obj.id },
		        { $pull: {items: {"name": obj.items.name}}}, function(){
		        	//console.log(JSON.stringify(document.items));
		        	// res.send('Success');

		       	 	db.getRecord(collection, {pat_id:obj.id}, function(document) {
		       		    if ( document != null ) {
		       		    	console.log("removeMedications is " + JSON.stringify(document.items));
		       		        res.send(JSON.stringify(document.items));
		       		        }
		       		  });
		      });
});

router.post('/addMedication', function(req,res,next){
	 var medication = req.body.data;
	 var collection = db.get().collection('patientMedications');
	 db.getRecord(collection, {pat_id: medication.pat_id}, function(document) {
		    if ( document != null ) {
		    	db.removeRecordNoFilter(collection, {pat_id: medication.pat_id}, function(document) {
		 		    if ( document == null ) {
		 		    	db.addRecord( collection, medication, function(){
		 			        res.send('Success')
		 			      });
		 		        }
		 		  });
		    } else {
		      db.addRecord( collection, medication, function(){
		        res.send('Success')
		      });
		    }
		  });
});


module.exports = router;
