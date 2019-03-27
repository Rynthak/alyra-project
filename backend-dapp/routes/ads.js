var express = require('express');
var router = express.Router();
var bs58 = require('bs58');
const configCategories = require('../assets/categories.json');
//Route for adding new ads to Orbit DB
router.post('/create', function(req, res, next) {   
    
    let newAds = req.body;
    newAds._id=Math.random();     
    newAds.status = 0;
    global.db.put(newAds).then((hash) => {
        newAds.hashIPFS=hash;
        let unencodedData= hash;
    	const hashHex = "0x"+bs58.decode(unencodedData).slice(2).toString('hex');
        newAds.hashBytes32 = hashHex;        
         //Send back to front end for contract interaction and payment
        res.status(200).json(newAds);
    });   
    
});
router.get('/getcategories', function(req, res, next) {  

   
    const categories =  global.db.query((doc) => doc._id =='categories');
    console.log(configCategories.categories);
    
    res.status(200).json(categories);

});
module.exports = router;