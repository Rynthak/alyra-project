var express = require('express');
var router = express.Router();


//Route for adding new ads to Orbit DB
router.post('/create', function(req, res, next) {
   
    /*await global.db.put({ _id: 'hello world'+Math.random() , doc: 'some things'+Math.random()  })   
           .then(() => db.get(''))
           .then((value) => console.log(value))*/
    let newAds = {};

    newAds._id=Math.random();

    newAds.title=req.body.title;
    console.log(newAds);

    res.json('Ads successfully added');
});

module.exports = router;