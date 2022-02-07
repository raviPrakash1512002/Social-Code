const nodemailer = require('../config/nodemailer');
// const { getMaxListeners } = require('../model/user');

//this is anoher way of exporting a method
exports.newComment = (comment) => {
    let htmlString = nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    

    nodemailer.transpoter.sendMail({
        from: 'socielappbyraviprakash@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: htmlString
    }, (err, info) =>{
        if (err) {
            console.log('Error in sending Mail', err);
            return;
        }
        return;
    });
}