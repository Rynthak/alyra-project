var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

const dbLib = require("./lib/db.js"); // handle all db stuff.

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
 

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

    // Start up the Express web server
    app.listen(port).on("error", expressErrorHandler);
    console.log('Express started on port ' + port);

    

    // Allow any computer to access this API.
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

     

    // Price API endpoint.
    app.get("/price", function(request, response, next) {
      response.send(`${price}`);
    });

    app.get("/orderbook", function(request, response, next) {
      response.send(`${db.address.toString()}`)
    })

   
}
startDB();


module.exports = app;
