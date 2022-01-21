const Post = require('../model/post');

module.exports.home = function (req, res) {
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //        title:'home',
    //        content:'Home Page',
    //        posts:posts
    //     });
    // });
    // Post.find({})
    // .populate('user')
    // .populate({
    //     path:'comments',
    //     populate:{
    //         path:'user'
    //     }
    // })
    // .exec(function (err, post) {
    //     if(err){
    //         console.log('error in geeting value post')
    //         return;
    //     }
    //     console.log(post);
    //     return res.render('home', {
    //         title: 'Social | Home',
    //         content: 'Home Page',
    //         posts: post
    //     });
    // })
    Post.find()
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        if(err){
            console.log('error');
            return;
        }
        return res.render('home', {
            title: "Codeial | Home",
            content: 'Home Page',
            posts:  posts
        });
    })
}



