
const FacebookStrategy = require("passport-facebook").Strategy;
const config = require("./config/configPassPort");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
var LocalStrategy = require("passport-local").Strategy;
const models = require("./db");
    

module.exports = (passport) => {
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
            const newUser = await models.user.create({email,password, displayName : req.body.displayName})
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
                function(req, email, password, done) {
                //
                // console.log(email);
                const user = models.user.findOne({ where: { email: email } })
                .then(user => {
                  if (!user) {
                      console.log('1')
                    return done(null, null);
                  }
      
                  if (user.password != password) {
                      console.log('2')
                    return done(null, false);
                  }
                  console.log('3')
                  return done(null, user);
                })
                .catch(err => {
                  console.log('Error:', err);
                  return done(null, false);
                });
            }
        )
    );
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
    return passport;
}
