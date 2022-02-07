

class PostComments {
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId) {
       
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        // call for all the existing comments
      
        $(' .delete-comment-button', this.postContainer).each(function () {
            
            self.deleteComment($(this));
        });
        
    }


    createComment(postId) {
        let pSelf = this;
        this.newCommentForm.submit(function (e) {
            e.preventDefault();
            let self = this;

            $.ajax({
                type: 'post',
                url: '/comment/create',
                data: $(self).serialize(),
                success: function (data) {
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).prepend(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));
                    

                     //enable the functionality of the toggle like button on the new comment
                     new ToggleLike($(' .toggle-like-button',newComment));

                    new Noty({
                        theme: 'relax',
                        text: "Comment published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();

                }, error: function (error) {
                    console.log(error.responseText);
                }
            });


        });
    }


    newCommentDom = function (comment) {
        // I've added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
        return $(`<li id="comment-${comment._id}">
                    
                            <small>
                                <a class="delete-comment-button" href="/comment/destroy/${comment._id}">X</a>
                            </small>
                           <p>
                               ${comment.content}
                               <br>
                               ${comment.user.name}
                               <br>
                               <spam>
                                    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${comment._id}&type=Comment">
                                        0 Likes
                                    </a>
                               </span>
                            </p>
                        </li>`);
    }


    deleteComment(deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();
                }, error: function (error) {
                    new Noty({
                        theme: 'relax',
                        text: "you cannot delete this comment!",
                        type: 'error',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();
                    console.log(error.responseText);
                }
            });

        });
    }
  
}
// let convertCommentsToAjax = function(){
//     $('#post-comments-list>ul>li').each(function(){
//         let self = $(this);
//         let deleteButton = $(' .delete-comment-button', self);
       
//         deleteComment(deleteButton);

    
      
//     });
// }




// convertCommentsToAjax();