const passport = require('passport');


const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user');

// authenticate using passportJs
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, password, done) {
        //finding user
        User.findOne({ email: email }, (err, user) => {
            if (err) {
                console.log('Error in finding the user using passport')
                return done(err);
            }
            if (!user || user.password != password) {
                console.log('Invalid Username/password!!!!')
                return done(null, false);
            }
            return done(null, user);
        });
    }
));


passport.serializeUser((user,done)=>{
    done(null,user.id);
});


passport.deserializeUser((id,done)=>{
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding the user using passport')
                return done(err);
        }
        return done(null,user);
    });
});

passport.checkAuthentication=(req,res,next)=>{
    //if the user is sign in ,then pass on the request next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
   //if the user is not signed in
    return res.redirect('/user/sign-in');
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains current signing user from the session cookie and we are just sending the locals for the views
        res.locals.user=req.user;
        return next()
    }
}




module.exports=passport;