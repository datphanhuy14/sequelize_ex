var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const nunjucks =require('nunjucks');ko khai báo const lung tung vậy
let nunjucks =require('nunjucks');
// const passport = require('passport'); không khai bao const nó sẽ ko nhận các config mới khi set các thuộc tính khác
let passport = require('passport');
//const session = require('express-session'); ko khai báo const lung tung vậy
let session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
let flash = require('connect-flash');
const redis = require('redis')
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()



// ==================


// view engine setup
app.set("view engine", "html");
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});
require('./passport')(passport);
// Passport & Session 
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    secret: 'keyboard cat',
    resave: false,
  })
) 
app.use(passport.initialize()); 
app.use(passport.session());


// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// dùng để hiện thông báo : Lưu ý phải khai báo trước Route
app.use(flash());

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
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {err : err.message});
});

// lấy cấu hình của
// let db = require('./db');
// db.sequelize.sync().then(async ()=>{
//   await db.user.findOrCreate({
//     where: {
//       email: 'thangnv@gmail.com'
//     },
//     defaults: {
//       email: 'thangnv@gmail.com',
//       password: "1"
//     }
//   })
// });

//lệnh để sync toàn bộ Models với database
// Connect to pg
module.exports = app;
