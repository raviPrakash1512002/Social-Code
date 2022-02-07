const passport = require('passport');
const JWTStrategy= require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const User = require('../model/user');

let opts ={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'sociel'
}

passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
    User.findById(jwtPayLoad._id,function(err,user){
        if(err){
            console.log('error in finding user through JWT passport');
            return;
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    })
}))

module.exports= passport;