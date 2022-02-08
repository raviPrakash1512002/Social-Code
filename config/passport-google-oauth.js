const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const env=require('./environment');
const User = require('../model/user');
//tell passport to use strategy for google login

passport.use(new googleStrategy({
    clientID: env.google_client_iD,
    clientSecret: env.google_client_Secret,
    callbackURL: env.google_callback_URL
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