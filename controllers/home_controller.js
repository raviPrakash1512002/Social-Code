const Post = require('../model/post');

module.exports.home = function (req, res) {
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //        title:'home',
    //        content:'Home Page',
    //        posts:posts
    //     });
    // });
    Post.find({}).populate('user').exec(function (err, posts) {
        return res.render('home', {
            title: 'home',
            content: 'Home Page',
            posts: posts
        });
    })
}



