const { localsName } = require("ejs");
const User = require("../model/user")


module.exports.profile=(req,res)=>{
    return res.render('user_profile',{
        title:"profile",
        user:req.user
    });
}

module.exports.signIn=(req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('user_signIn',{
        title:"Social|Sign-In"
    })
}


module.exports.signUp=(req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('user_signUp',{
        title:"Social|Sign-Up"
    })
}

module.exports.create=(req,res)=>{
    if(req.body.password != req.body.confirm_password){
        console.error("confirm password are different from password");
        return res.redirect('back');
    }
    
    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
            console.log('error in finding user in signUp')
            return;
        }
        if(!user){
            User.create(req.body,(err,user)=>{
                if(err){
                    console.log('error in creating user in signUp')
                    return;
                }
                return res.redirect('/user/sign-in');

            })
        }else{
            return res.redirect('back');
        }
    });
     
}

module.exports.createSession=(req,res)=>{
       return res.redirect('/');
}


module.exports.destroySession=function(req,res){
    req.logout();
    return res.redirect('/');
}


