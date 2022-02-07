const Comment = require('../model/comment');
const commentsMailer= require('../mailers/comment_mailers');

const Post = require('../model/post');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');

const Like = require('../model/like');

module.exports.creates = async function (req, res) {
    try {
        let post = await Post.findById(req.body.post);
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })

            post.comments.push(comment);
            post.save();
            comment = await comment.populate('user','name email');
            let job=queue.create('emails',comment).save(function(err){
                 if(err){
                     console.log('error in creating a queue',err);
                 }
                 console.log(job.id)
            });
            // commentsMailer.newComment(comment);
            if (req.xhr) {
                // Similar for comments to fetch the user's id!
               
                
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }
            req.flash('success', 'Comment Added by ajax!!');
            res.redirect('/');
        }
    } catch (err) {
        req.flash('error', err);
        return;
    }

}

module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id) {
            let postId = comment.post;

            comment.remove();
            let post = Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            //delete the associated likes for this comment
            await Like.deleteMany({likeable:comment._id,onModel:'Comment'});
            // send the comment id which was deleted back to the views
            
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
            req.flash('success', 'Comment Successfully Deleted!!');
            return res.redirect('back')

        } else {
            // req.flash('error', 'Unauthorized!')
            return res.status(401).json({
                message: "you cannot delete this comment!"
            });
        }
    } catch (err) {
        req.flash('error', err);
        return;
    }
}
