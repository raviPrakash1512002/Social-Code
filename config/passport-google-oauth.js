const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../model/user');
//tell passport to use strategy for google login

passport.use(new googleStrategy({
    clientID: "348955448407-iln18lu046digmkc49dbq9h64dmpqivt.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/user/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        
        //find a user
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) {
                console.log('Error in google-strategy-passport', err);
                return done(err);
            }
            
            console.log(profile);
            if (user) {
                //if found set this user as req.user
                
                return done(null, user);
            } else {
                // if not found create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function (err, user) {
                    if (err) {
                        console.log('Error in creating user through google-strategy-passport', err);
                        return;
                    }
                    return done(null, user);
                });
            }
        })
    }
));

module.exports=passport;