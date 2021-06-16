const passport = require('passport');
const FacebookStrategy  = require('passport-facebook').Strategy;
const config = require('./config/configPassPort');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
var LocalStrategy = require('passport-local').Strategy;
const models = require('./models');


//Local
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true  },
    function(req, email, password, done) {
    process.nextTick(function(){
      User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    })
    }
  ));

// Sử dụng FacebookStrategy cùng Passport-Fb 
passport.use(new FacebookStrategy({
    clientID: config.clientID,          
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL,
    profileFields: ['email','gender','locale','displayName']
  },
  function(accessToken, refreshToken, profile, cb) { 
    // console.log(profile);
    return cb(null, profile);
  }
  ));
  
  passport.use(new GoogleStrategy({
    clientID: config.gClientID,
    clientSecret: config.gClientSecret,
    callbackURL: config.gCallbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
     // console.log(profile);
     return cb(null, profile);
  }
  ));
  // PASSPORT & session 
  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });  
//   passport.deserializeUser(function(user, cb) {
//     cb(null, user);
//   });

  passport.deserializeUser(function(id, cb) {
    models.user.findById(id, function (err, user) {
        done(err, user);
    });
    
  });
  