const Post = require('../model/post');
const User = require('../model/user');

module.exports.home = async function (req, res) {
    try {
        //populate the likes of each comment
        //populate the likes of each post 
        let posts = await Post.find()
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                },

                populate: {
                    path: 'likes'
                }
            }).populate('likes');

        let users = await User.find({});
        let user;
        if (req.user) {
            user = await User.findById(req.user._id)
                .populate({
                    path: "friend",
                    populate: {
                        path: "from_user",
                    },
                })
                .populate({
                    path: "friend",
                    populate: {
                        path: "to_user",
                    },
                });
        }

        return res.render('home', {
            content: "Home Page",
            posts: posts,
            all_user: users,
            user:user

        });


    } catch (err) {
        console.log("Error", err);
        return;
    }

}

