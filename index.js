const express=require('express');
const env = require('./config/environment');
const logger = require('morgan');

const cookieparser=require('cookie-parser');
const app=express();
require('./config/view-helpers')(app);
const port=8000;

const db=require('./config/mongoose');

const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local');
const passportJWT= require('./config/passport-jwt');
const passportGoogle= require('./config/passport-google-oauth');
const MongoStore=require('connect-mongo');

const expressLayouts=require('express-ejs-layouts');
const flash= require('connect-flash');
const customMware=require('./config/middleware');

//setup the chat server to be used with sockets.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_socket').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listimg on port 5000');
// app.use(scssMiddleware({
//       src:'/asset/scss',
//       dest:'/asset/css',
//       debug:true,
//       outputStyle:'extended',
//       prefix:'/css'
// }));
const path = require('path');



//reading through post request

app.use(express.urlencoded({extended:false}));

app.use(cookieparser());

app.use(express.static(env.asset_path));

// make the upload path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'))

app.use(logger(env.morgan.mode,env.morgan.options));

app.use(expressLayouts);

//extract style and scripts from sub pages into the layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



app.set('view engine','ejs');
app.set('views','./views');




//mongo store use to store the session cookie in db
app.use(session({
    name:'social',
    secret:env.session_cookie_key,
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