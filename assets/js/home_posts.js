
{
    //method to submit the form data for new post using AJAX
    let createPost = function () {
        let newPostForm = $('#new-post-form');


        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({

                type: 'post',
                url: '/post/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    let  newpost=newPostDom(data.data.post);
                    $('.post-container>ul').prepend(newpost);
                    deletePost($(' .delete-post-btn',newpost));
                      // call the create comment class
                      new PostComments(data.data.post._id);

                      //enable the functionality of the toggle like button on the new post
                      new ToggleLike($(' .toggle-like-button',newpost));
                      

                      new Noty({
                          theme: 'relax',
                          text: "Post published!",
                          type: 'success',
                          layout: 'topRight',
                          timeout: 1500
                          
                      }).show();
  
                }, error: function (error) {
                    console.log(error.responeText);
                }
            })
        });

    }
    //method to create post in DOM

    let newPostDom = function (post) {
        //show the count of zero likes on this post.

        return $(`<li id="post-${post._id}">
                    <p>
                        <small>
                            <a class="delete-post-btn" href="/post/destroy/${post._id}">X</a>
                        </small>
                        ${post.content}
                        <br>
                        ${post.user.name}
                        <br>
                        <span>
                            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                                 0 Likes
                            </a>
                        </span>
                        
                    </p>
                    <div class="post-comment">
                        <form id="post-${ post._id }-comments-form" action="/comment/create" method="POST">
                            <input type="text" name="content" placeholder="Comments...." required>
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Add Comment">
                        </form>
                
                        <div id="post-comments-list">
                            <ul id="post-comments-${ post._id }">
    
                            </ul>
                
                        </div>
                
                    </div>
                </li>`)
                                   
    }

    //method to delete a post form DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault(); 
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }, error:function(error){
                    new Noty({
                        theme: 'relax',
                        text: "you cannot delete this post!",
                        type: 'error',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                    console.log(error.responseText);
                }
            });

        });
    }

    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('.post-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-btn', self);
          
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
           
            let postId = self.prop('id').split("-")[1];
        
            new PostComments(postId);
        });
    }



    createPost();
    convertPostsToAjax();
}
    
