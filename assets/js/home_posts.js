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
                }, error: function (error) {
                    console.log(error.responeText);
                }
            })
        });

    }
    //method to create post in DOM

    let newPostDom = function (post) {

        return $(`<li id="post-${post._id}">
                    <p>
                        <small>
                            <a class="delete-post-btn" href="/post/destroy/${post._id}">X</a>
                        </small>
                        ${post.content}
                        ${post.user.name}
                        
                    </p>
                    <div class="post-comment">
                        <form action="/comment/create" method="POST">
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
                }, error:function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
    

    createPost();
}
