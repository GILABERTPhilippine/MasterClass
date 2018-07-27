var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// IMPORTANT - A ajouter
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// IMPORTANT - Connection BDD
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/masterclass');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
});

// var collection = db.collection('Image')
// collection.insert({
//     imageId: 'fgiherkdvkerhvoerhj123545',
//     description: 'Bouuuuuuuuuu !',
// }, function(err, result) {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result)
// })

var app = express();

// IMPORTANT - A ajouter
var urlencodedParser = bodyParser.urlencoded({
    extended: true
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req
        .app
        .get('env') === 'development' ?
        err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;