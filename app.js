var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var test = require('./routes/test');
var index = require('./routes/index');
var inwebhook = require('./routes/inwebhook');
var sharefile = require('./routes/sharefile');
var add2slack = require('./routes/addtoslack');
var slackoauth = require('./routes/slackoauth');
var signtoslack = require('./routes/signtoslack');
var sharelink = require('./routes/getsharelink');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));


app.use('/', test);
app.use('/index', index);
app.use('/sharefile',sharefile);
app.use('/inwebhook', inwebhook);
app.use('/addtoslack', add2slack);
app.use('/slackoauth', slackoauth);
app.use('/signtoslack', signtoslack);
app.use('/sharefile/getsharelink',sharelink);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});






// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// module.exports = app;
//
// #!/usr/bin/env node
// var app = require('../app');

app.set('port', process.env.PORT);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
