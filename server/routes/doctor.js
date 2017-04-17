var express = require('express');
var router = express.Router();
var db = require('../db');

/*router.get('*', function(req, res) {
    res.send('Sorry, this is an invalid URL.');
});


module.exports = router;*/

/* Add/Update Patient Activities. */

router.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
	});


router.get('/searchPatient',function(req,res,next){
	var collection = db.get().collection('patientDetails');
	db.findRecordNoFilter(collection,function(document){
		if(document!=null){
			console.log(JSON.stringify(document));
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
		    	console.log(JSON.stringify(document));
		        res.send(document);
		        }
		  });
});


module.exports = router;