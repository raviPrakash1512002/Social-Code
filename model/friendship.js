const mongoose = require('mongoose');


const friendSchema = new mongoose.Schema({
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
},{timeStamps:true});

const Friendship = mongoose.model('Friendship',friendSchema);
module.exports=Friendship;