const express=require('express');
const cookieparser=require('cookie-parser');
const app=express();
const port=8000;

const db=require('./config/mongoose');



//reading through post request
app.use(express.urlencoded());


app.use(cookieparser());



// Use Express Router
app.use('/',require('./routes'))
app.set('view engine','ejs');
app.set('views','./views');






app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server :${err}`);
        return;
    }
    console.log(`Server Successfully running on port : ${port}`);
})