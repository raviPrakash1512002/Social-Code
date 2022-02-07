const { localsName } = require("ejs");
const User = require("../model/user")
const Friendships = require("../model/friendship");
const fs = require('fs');
const path = require('path');








module.exports.profile = async (req, res) => {
    try {
        let user = await User.findById({ _id: req.params.id });



        let friendship1, friendship2

        friendship1 = await Friendships.findOne({
            from_user: req.user,
            to_user: req.params.id,
        });

        friendship2 = await Friendships.findOne({
            from_user: req.params.id,
            to_user: req.user,
        });


        let populated_user = await User.findById(req.user).populate('friend');


        return res.render('user_profile', {
            title: "Socail | profile",
            profile_user: user, populated_user
        });
    }catch (err) {
        console.log("Error", err);
        return;
    }



}

module.exports.update = async (req, res) => {
    // if(req.user.id = req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //        req.flash('success', 'Profile Page Updated!!');
    //        return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }
    if (req.user.id = req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log('****Muter Error: ', err);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if (req.file) {

                    if (user.avatar) {
                        let avatarpathName = path.join(__dirname, '..', user.avatar);

                        if (fs.existsSync(avatarpathName)) {
                            fs.unlinkSync(avatarpathName)
                        }
                    }


                    // this is saving the path of the uploaded file inton the avatar field is the user
                    user.avatar = (User.avatarPath + '/' + req.file.filename);
                }
                user.save();
                return res.redirect('back');
            })

        } catch (err) {
            req.flash("error", err);
            return res.redirect('back');
        }



    } else {
        return res.status(401).send('Unauthorized');
    }

}

module.exports.signIn = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    return res.render('user_signIn', {
        title: "Social|Sign-In"
    })
}


module.exports.signUp = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/user/profile');
    }
    return res.render('user_signUp', {
        title: "Social|Sign-Up"
    })
}

module.exports.create = (req, res) => {
    if (req.body.password != req.body.confirm_password) {
        console.error("confirm password are different from password");
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log('error in finding user in signUp')
            return;
        }
        if (!user) {
            User.create(req.body, (err, user) => {
                if (err) {
                    console.log('error in creating user in signUp')
                    return;
                }
                return res.redirect('/user/sign-in');

            })
        } else {
            return res.redirect('back');
        }
    });

}

module.exports.createSession = (req, res) => {

    req.flash('success', 'Logged in Successfully');

    return res.redirect('/');
}


module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('success', 'You have logged out!');
    return res.redirect('/');
}


