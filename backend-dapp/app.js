var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var adsRouter = require('./routes/ads');
var dbLib = require("./lib/db.js"); // handle all db stuff. 
var ethers = require('ethers');


//Config section 
const configNetwork = require('./config/network.json'); 

console.log(configNetwork);


var app = express();


global.db;
 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/ads', adsRouter);
 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



//STAR db server
async function startDB() {
    // Open the Database
    db = await dbLib.openDb();  
    
}
startDB();


var provider = global.provider =new ethers.providers.JsonRpcProvider("http://localhost:8545");




module.exports = app;
