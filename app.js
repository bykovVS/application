// Connect
var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var log = require('./libs/log')(module); 

var index = require('./routes/index');
var users = require('./routes/users');
var test = require('./routes/test');

var app = express();

// server setup

app.set('port', config.get('port'));

// create server

http.createServer(app).listen(app.get('port'), function(){
   log.info('Express server listening on port ' + config.get('port')); 
});

// configuration templating system
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// Set testing view page

app.use('/test', test);
//app.set('/test', function(req, res, next) {
//    res.render("test", {
//        title: "Vladyslav"
//    });
//});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
