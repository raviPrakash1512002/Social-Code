const express=require('express');
const cookieparser=require('cookie-parser');
const app=express();
const port=8000;

const db=require('./config/mongoose');

const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local');
const MongoStore=require('connect-mongo');
const expressLayouts=require('express-ejs-layouts');
const flash= require('connect-flash');
const customMware=require('./config/middleware');

// app.use(scssMiddleware({
//       src:'/asset/scss',
//       dest:'/asset/css',
//       debug:true,
//       outputStyle:'extended',
//       prefix:'/css'
// }));



//reading through post request
app.use(express.urlencoded());


app.use(cookieparser());

app.use(express.static('./assets'));
app.use(expressLayouts);

//extract style and scripts from sub pages into the layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



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
 

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
// Use Express Router
app.use('/',require('./routes'));








app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server :${err}`);
        return;
    }
    console.log(`Server Successfully running on port : ${port}`);
})