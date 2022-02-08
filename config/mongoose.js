const mongoose=require('mongoose');
const env = require('./environment')
mongoose.connect(`mongodb://localhost/${env.db}`);

const db=mongoose.connection;

db.on('error',console.error.bind(console,'connecting error in mongodb'));

db.once('open',()=>{
   console.log("database connect successfully!!!");
});

module.exports=db;