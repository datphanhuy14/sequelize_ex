
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
                //
                // console.log(email);
                const user = await models.user.findOne({ where: { email :  email }, raw: true});
                console.log(user);
                if(!user){
                    // req.flash('error_msg', 'Vui lòng đăng nhập lại.');
                    done(null, null);
                if (user.password!= password) {
                    return done(null, false, 
                        req.flash('incorrect_msg', 'email or password is incorrect.'))
                }    
                }else{
                    req.flash('success_msg', 'Đăng nhập thành công.');
                    done(null, user);
                }

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
