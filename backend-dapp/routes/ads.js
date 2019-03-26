var express = require('express');
var router = express.Router();


//Route for adding new ads to Orbit DB
router.post('/create', function(req, res, next) {   
    
    let newAds = {};
    newAds._id=Math.random();
    newAds.title=req.body.title;
    newAds.description=req.body.description;
    newAds.pictures=req.body.pictures;
   
    global.db.put(newAds).then((hash) => {
        newAds.hashIPFS=hash;
        console.log(hash);
         //Send back to front end for contract interaction and payment
        res.status(200).json(newAds);
    });   
    
});

module.exports = router;