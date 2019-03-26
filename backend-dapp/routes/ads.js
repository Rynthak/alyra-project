var express = require('express');
var router = express.Router();



router.post('/create', function(req, res, next) {
   
    res.json('Ads successfully added');
});

module.exports = router;