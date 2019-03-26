var express = require('express');
var router = express.Router();
var bs58 = require('bs58');

//Route for adding new ads to Orbit DB
router.post('/create', function(req, res, next) {   
    
    let newAds = {};
    newAds._id=Math.random();
    newAds.title=req.body.title;
    newAds.description=req.body.description;
    newAds.pictures=req.body.pictures;
   
    global.db.put(newAds).then((hash) => {
        newAds.hashIPFS=hash;
        let unencodedData= hash;
    	const hashHex = "0x"+bs58.decode(unencodedData).slice(2).toString('hex');
        newAds.hashBytes32 = hashHex;        
         //Send back to front end for contract interaction and payment
        res.status(200).json(newAds);
    });   
    
});

module.exports = router;