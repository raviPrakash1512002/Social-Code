function toggleFriend(toggleFriendBtn) {
    $(toggleFriendBtn).click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: $(toggleFriendBtn).attr("href"),
            success: function (data) {
                if (data.deleted) {
                    $(toggleFriendBtn).html("Add Friend")
                } else {
                    $(toggleFriendBtn).html("Remove Friend")
                }
            },
            error: function (err) {
                console.log(err.responseText);
            }
        })
    })
}

toggleFriend($(".toggle-friend-btn"));