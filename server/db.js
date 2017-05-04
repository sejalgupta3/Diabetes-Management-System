var MongoClient = require('mongodb').MongoClient

var state = {
    db: null,
}

exports.connect = function(url, done) {
    if (state.db) return done()

    MongoClient.connect(url, function(err, db) {
        if (err) return done(err)
        state.db = db
        done()
    })
}

exports.get = function() {
    return state.db
}

exports.close = function(done) {
    if (state.db) {
        state.db.close(function(err, result) {
            state.db = null
            state.mode = null
            done(err)
        })
    }
}

exports.getRecord = function( collection, filter ,callback ) {
  collection.findOne( filter, function(err, document) {
    if(err) {
      //res.send(err);
      console.log(err);
    } else {
      callback(document);
    }
  });
},

exports.updateRecord = function( collection, filter, options, callback ) {
  collection.update( filter, options, function(err){
    if (err) {
        console.log(err);
        //res.send(err);
    } else {
      callback();
    }
  });
},

exports.addRecord = function( collection, data, callback ) {
  collection.insert( data, {
      w: 1
  }, function(err, records) {
      if (err) {
        console.log(err);
          //res.send(err);
      } else {
          callback();
      }
  });
},

exports.removeRecordNoFilter = function(collection,filter,callback){
	collection.remove(filter,function(err){
		if(err){
			res.send(err);
		}
		else {
		      callback();
		    }
	});
};


exports.findRecordNoFilter = function(collection,callback){
	collection.find({}).toArray(function(err,documents){
		if(err){
      console.log(err);
			//res.send(err);
		}
		else{
			callback(documents);
		}
	});
}
