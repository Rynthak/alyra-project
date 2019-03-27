var express = require('express');
var router = express.Router();
var bs58 = require('bs58');
const IPFS = require('ipfs');
var formidable = require('formidable');
var readChunk = require('read-chunk');
var fileType = require('file-type');
var fs = require('fs');

const configCategories = require('../assets/categories.json');
//Route for adding new ads to Orbit DB
router.post('/create', function(req, res, next) {   
    
    let newAds = {};
     
    newAds._id=Math.random();     
    newAds.status = 0;
    newAds.files=[];
    var form = new formidable.IncomingForm();
   
    
    form.parse(req, function(err, fields, files) {
       newAds = Object.assign(fields,newAds);
       newAds.phone=JSON.parse( newAds.phone);
     });
    
    form.on('file', function (name, file){    	 
    	let sFileUploaded = fs.readFileSync(file.path);
        let sBuffer = Buffer.from(sFileUploaded);
        
    	global.db._ipfs.files.add(sBuffer, (err, result) => {
    		if (err) {
    	          console.log(err);
    	          res.status(501).json(err);
    	    }else{
                
    	    	let data = result[0];
    	    	let unencodedData= data.hash;
    	    	const hashHex = "0x"+bs58.decode(unencodedData).slice(2).toString('hex');
				newAds.files.push(hashHex);
    	    }    
    	});
         
    }).on('end', function() {
            global.db.put(newAds).then((hash) => {       

            newAds.hashIPFS=hash;
            let unencodedData= hash;
            const hashHex = "0x"+bs58.decode(unencodedData).slice(2).toString('hex');
            newAds.hashBytes32 = hashHex;        
            //Send back to front end for contract interaction and payment
            console.log(hash,newAds);            
            res.status(200).json(newAds);
        });  
    }).on('error', function(err) {
        console.log(err);
    	res.status(501).json(err);
    });;    
     
    
});
var handleUpload = async function(req){
        var form = new formidable.IncomingForm();
        form.parse(req);
        var formfields = await new Promise(function (resolve, reject) {
            form.on('file', function (name, file){
                console.log(name, file)
            });
        });
    };

router.get('/getcategories', function(req, res, next) {  

   
    const categories =  global.db.query((doc) => doc._id =='categories');
    console.log(configCategories.categories);
    
    res.status(200).json(categories);

});
module.exports = router;