const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const config = require("./config/configPassPort");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
var LocalStrategy = require("passport-local").Strategy;
const models = require("./models");


//Local
passport.use('local-signup', new LocalStrategy({
  // by default, local strategy uses username and password, we will override with email
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
},
  async function(req, email, password, done) {
    const user = await models.user.findOne({ where: { email :  email }})
      if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
      } else {

          // if there is no user with that email
          // create the user
          const newUser = await models.user.create({email,password})
              return done(null, newUser);
      }
  })
);
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
        async function(req, email, password, done) {
        const user = await models.user.findOne({ where: { email :  email }})
        if(!user){
        }
        return done(null, user);  
    }
  )
);
// passport.use('local-login', new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password',
//   passReqToCallback: true
// },
//  async function (req, email, password, done) { // callback với email và password từ html form

//  await models.user.findOne({where: { email : req.body.email}}, function (err, user) {
//       if (err)
//           return done(err);
//       // if no user is found, return the message
//       if (!user)
//           return done(null, false, req.flash('loginMessage', 'No user found.'));
//       // if the user is found but the password is wrong
//       if (!user.verifyPassword(password))
//           return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // thông báo lỗi chỉ này chỉ dùng khi dev
//       // all is well, return successful user
//       return done(null, user);
//   });
// })
// );
// Sử dụng FacebookStrategy cùng Passport-Fb
passport.use(
  new FacebookStrategy(
    {
      clientID: config.clientID,
      clientSecret: config.clientSecret,
      callbackURL: config.callbackURL,
      profileFields: ["email", "gender", "locale", "displayName"],
    },
    function (accessToken, refreshToken, profile, cb) {
      // console.log(profile);
      return cb(null, profile);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: config.gClientID,
      clientSecret: config.gClientSecret,
      callbackURL: config.gCallbackURL,
    },
    function (accessToken, refreshToken, profile, cb) {
      // console.log(profile);
      return cb(null, profile);
    }
  )
);
// PASSPORT & session
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
  passport.deserializeUser(function(user, cb) {
    cb(null, user);
  });

// passport.deserializeUser(function (id, cb) {
//   models.user.findById(id, function (err, user) {
//     done(err, user);
//   });
// });
