{let t=function(){let t=$("#new-post-form");t.submit((function(o){o.preventDefault(),$.ajax({type:"post",url:"/post/create",data:t.serialize(),success:function(t){let o=e(t.data.post);$(".post-container>ul").prepend(o),n($(" .delete-post-btn",o)),new PostComments(t.data.post._id),new ToggleLike($(" .toggle-like-button",o)),new Noty({theme:"relax",text:"Post published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responeText)}})}))},e=function(t){return $(`<li id="post-${t._id}">\n                    <p>\n                        <small>\n                            <a class="delete-post-btn" href="/post/destroy/${t._id}">X</a>\n                        </small>\n                        ${t.content}\n                        <br>\n                        ${t.user.name}\n                        <br>\n                        <span>\n                            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${t._id}&type=Post">\n                                 0 Likes\n                            </a>\n                        </span>\n                        \n                    </p>\n                    <div class="post-comment">\n                        <form id="post-${t._id}-comments-form" action="/comment/create" method="POST">\n                            <input type="text" name="content" placeholder="Comments...." required>\n                            <input type="hidden" name="post" value="${t._id}">\n                            <input type="submit" value="Add Comment">\n                        </form>\n                \n                        <div id="post-comments-list">\n                            <ul id="post-comments-${t._id}">\n    \n                            </ul>\n                \n                        </div>\n                \n                    </div>\n                </li>`)},n=function(t){$(t).click((function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(t){$(`#post-${t.data.post_id}`).remove(),new Noty({theme:"relax",text:"Post Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){new Noty({theme:"relax",text:"you cannot delete this post!",type:"error",layout:"topRight",timeout:1500}).show(),console.log(t.responseText)}})}))},o=function(){$(".post-container>ul>li").each((function(){let t=$(this),e=$(" .delete-post-btn",t);n(e);let o=t.prop("id").split("-")[1];new PostComments(o)}))};t(),o()}