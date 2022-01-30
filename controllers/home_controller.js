const Post = require('../model/post');
const User = require('../model/user');

module.exports.home = async function (req, res) {
    try {
        let posts = await Post.find()
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });

        let users = await User.find({});

        return res.render('home', {
            title: "Social | Home",
            content:"Home Page",
            posts: posts,
            all_user: users
        });


    } catch (err) {
        console.log("Error", err);
        return;
    }

}

