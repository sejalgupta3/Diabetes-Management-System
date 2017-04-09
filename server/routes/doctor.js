var express = require('express');
var router = express.Router();

router.get('*', function(req, res) {
    res.send('Sorry, this is an invalid URL.');
});

module.exports = router;
