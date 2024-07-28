async function newCommentHandler(event) {
    event.preventDefault();

    const comment_body = document.getElementById("comment").value.trim();

    const url = window.location.toString().split("/");
    const blogPost_id = url[url.length - 1];

    if (comment_body) {
        const response = await fetch("/api/comment", {
            method: "POST",
            body: JSON.stringify({
                blogPost_id,
                comment_body,   
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            document.location.reload();
        }else {
            alert(response.statusText);
        }
    }
}

document.getElementById("comment-form").addEventListener("submit", newCommentHandler);
