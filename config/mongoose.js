const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/social_database');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'connecting error in mongodb'));

db.once('open',()=>{
   console.log("database connect successfully!!!");
});

module.exports=db;