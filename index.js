const express=require('express');
const cookieparser=require('cookie-parser');
const app=express();
const port=8000;

const db=require('./config/mongoose');

const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local');
const MongoStore=require('connect-mongo');


//reading through post request
app.use(express.urlencoded());


app.use(cookieparser());




app.set('view engine','ejs');
app.set('views','./views');


//mongo store use to store the session cookie in db
app.use(session({
    name:'social',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore(
        {
           mongoUrl: 'mongodb://localhost/social_database',
           autoRemove:'disabled'
        },
        function(err){
           console.log(err);
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
 


// Use Express Router
app.use('/',require('./routes'));

app.use(passport.setAuthenticatedUser);






app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server :${err}`);
        return;
    }
    console.log(`Server Successfully running on port : ${port}`);
})