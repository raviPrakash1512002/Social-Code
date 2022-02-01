const mongoose=require('mongoose');
const multer = require('multer');
const path = require('path');

const Avatar_path = path.join('/uploads/users/avatars');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    }
},{
    timestamps:true
})

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',Avatar_path));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
//static
userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
userSchema.statics.avatarPath=Avatar_path;
  


const user = mongoose.model('user',userSchema);
module.exports=user;