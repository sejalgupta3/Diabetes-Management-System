var express = require('express');
var router = express.Router();
var db = require('../db')

/* GET users listing. */
router.post('/activites', function(req, res, next) {
    var collection = db.get().collection('activities')
    collection.insert(req.body, {
        w: 1
    }, function(err, records) {
        if (err) {
            res.send(err);
        } else {
            res.send('Success');
        }
    });
    res.send('Success');
});

module.exports = router;
