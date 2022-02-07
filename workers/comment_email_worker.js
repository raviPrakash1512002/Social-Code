const queue = require('../config/kue');
const commentMailer = require('../mailers/comment_mailers');


queue.process('emails',function(job,done){
    console.log('emails worker is processing a job',job.data);
    commentMailer.newComment(job.data);
    done();
})