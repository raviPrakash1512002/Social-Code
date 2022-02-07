const Post = require('../model/post');
const Comment = require('../model/comment');
const Like = require('../model/like');
module.exports.posts = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if (req.xhr) {
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user');
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created"
            })
        }


        req.flash('success', 'New Post Added')
        return res.redirect('back');

    } catch (err) {
        req.flash('error', err);
        return;
    }
};


module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        //.id means converting the ._id in string
        if (post.user == req.user.id) {

            
            //delete the associated likes for the post
            await Like.deleteMany({ likeable: post, onModel: 'Post' });
            //delete the associated likes for the comment which is associated with that post
            await Like.deleteMany({ likeable: { $in: post.comments } });

            post.remove();
            await Comment.deleteMany({ post: req.params.id });
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted successfully"
                });
            }
            req.flash('success', 'Post Deleted')
            return res.redirect('back');
        } else {
            req.flash('error', 'you cannot delete this Post!');
            return res.status(401).json({
                message: "you cannot delete this post!"
            });
        }
    } catch (err) {
        req.flash("error", err);
        return res.redirect('back');
    }

}