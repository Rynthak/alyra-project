var express = require('express');
var router = express.Router();
var IPFS = require('ipfs');
var cities = require("all-the-cities")
var formidable = require('formidable');
var readChunk = require('read-chunk');
var fileType = require('file-type');
var fs = require('fs');
const uuidv4 = require('uuid/v4');


const configCategories = require('../assets/categories.json');
//Route for adding new ads to Orbit DB

 
router.get('/flushall',  async function(req, res, next) {  
     const all=global.db.get('');
     let temp ={}
     for(var key in all){
         temp._id=all[key]._id;
         temp.status = -1;
         global.db.put(doc);
         temp ={};
     }
     await global.db.load();
     res.status(200).json(all);
});



router.post('/create', function(req, res, next) {   
    
    let newAds = {};
     
    newAds._id=  uuidv4();  
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
             newAds.files.push(ipfsFile[0].hash);           
        }
         

       newAds = Object.assign(fields,newAds);
       newAds.phone=JSON.parse( newAds.phone);
       newAds.city=JSON.parse( newAds.city);

        
       global.db.put(newAds).then((hash) => {                         
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
    res.status(200).json(categories);
});

router.post('/getcitie', function(req, res, next) { 
    let search ={};
     
    search.items = cities.filter(city => {    
       return city.name.match(req.body.citie);
    })   
    res.status(200).json(search);
});

 
 


module.exports = router;