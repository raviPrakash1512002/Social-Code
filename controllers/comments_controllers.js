const Comment = require('../model/comment');


const Post = require('../model/post');




module.exports.creates= function (req, res) {
    console.log('5');
    Post.findById(req.body.post, function (err, post) {
        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function (err, comment) {
                if (err) {
                    console.log('error in creating comment');
                    return;
                }
               console.log(comment);
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            })
        }
    })
}

