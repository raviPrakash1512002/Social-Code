const Post = require('../model/post');
const Comment = require('../model/comment');
module.exports.posts = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if (req.xhr) {
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
            return res.redirect('back');
        }
    } catch (err) {
        req.flash("error", err);
        return;
    }

}