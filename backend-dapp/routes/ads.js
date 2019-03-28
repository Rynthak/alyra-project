var express = require('express');
var router = express.Router();
var bs58 = require('bs58');
var IPFS = require('ipfs');
var cities = require("all-the-cities")
var formidable = require('formidable');
var readChunk = require('read-chunk');
var fileType = require('file-type');
var fs = require('fs');


const configCategories = require('../assets/categories.json');
//Route for adding new ads to Orbit DB

 
router.get('/flushall',  async function(req, res, next) {  
     const all=global.db.get('');
     console.log(all);
     for(var key in all){
         global.db.del(all[key]._id);
     }
     await global.db.load();
     res.status(200).json(all);
});



router.post('/create', function(req, res, next) {   
    
    let newAds = {};
     
    newAds._id=Math.random();     
    newAds.status = 0;
    newAds.date_add = Date.now() / 1000 | 0;
    newAds.files=[];
    var form = new formidable.IncomingForm();
    
      

     
    form.parse(req, async function(err, fields, files) {
        let sFileUploaded=''  
        let sBuffer ='';
        let ipfsFile = '';
        for (const file in files) {
            
             sFileUploaded = fs.readFileSync(files[file].path);
             sBuffer = Buffer.from(sFileUploaded);
             ipfsFile=await global.db._ipfs.files.add(sBuffer);
             console.log(ipfsFile);
             newAds.files.push(ipfsFile);
            
        }
       console.log(newAds); 

       newAds = Object.assign(fields,newAds);
       newAds.phone=JSON.parse( newAds.phone);
       newAds.city=JSON.parse( newAds.city);

        
            global.db.put(newAds).then((hash) => {       

            newAds.hashIPFS=hash;
            let unencodedData= hash;
            const hashHex = "0x"+bs58.decode(unencodedData).slice(2).toString('hex');
            newAds.hashBytes32 = hashHex;        
            //Send back to front end for contract interaction and payment
                        
            res.status(200).json(newAds);
        });  


     });
    form.on('error', function(err) {
        console.log(err);
    	res.status(501).json(err);
    });;    
     
    
});
 

router.get('/getcategories', function(req, res, next) {  

   
    const categories =  global.db.query((doc) => doc._id =='categories');
    console.log(configCategories.categories);
    
    res.status(200).json(categories);

});

router.post('/getcitie', function(req, res, next) { 
    let search ={};
    console.log(req.body.citie);
    search.items = cities.filter(city => {    
       return city.name.match(req.body.citie);
    })   
    res.status(200).json(search);
});




module.exports = router;