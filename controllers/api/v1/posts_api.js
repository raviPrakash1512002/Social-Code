const Post = require('../../../model/post');
const Comment = require('../../../model/comment');

module.exports.index = async function (req, res) {


    let posts = await Post.find()
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

    return res.status(200).json({
        message: "List of Posts",
        posts: posts
    });
}



module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        //.id means converting the ._id in string
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({ post: req.params.id });
            return res.status(200).json({
                message:"post delete successfully!!!"
            })
        
        } else {
            return res.status(401).json({
                message:"you cannot delete this post"
            })
        }
    } catch (err) {
        return res.json(500,{
            message:"Internal Server Error!"
        })
    }

}