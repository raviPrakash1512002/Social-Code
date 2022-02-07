const User = require("../model/user");
const Friendships = require("../model/friendship");



module.exports.addFriend = async function (req, res) {


    let existingFriendship = await Friendships.findOne({
        from_user: req.user,
        to_user: req.query.id,
    });

    let toUser = await User.findById(req.user);
    let fromUser = await User.findById(req.query.id);

    let deleted = false;

    if (existingFriendship) {
        toUser.friend.pull(existingFriendship._id);
        fromUser.friend.pull(existingFriendship._id);
        toUser.save();
        fromUser.save();
        existingFriendship.remove();
        deleted = true;
        removeFriend = true;
    } else {
        let friendship = await Friendships.create({
            to_user: req.query.id,
            from_user: req.user._id
        });

        toUser.friend.push(friendship);
        fromUser.friend.push(friendship);
        toUser.save();
        fromUser.save();
    }

    if (req.xhr) {
        return res.status(200).json({
            deleted: deleted,
            message: "Request Successful",
        });
    } 
    return res.redirect("back");
}