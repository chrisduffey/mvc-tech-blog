async function newCommentHandler(event) {
    event.preventDefault();

    // Get and trim the comment content
    const comment_content = document.getElementById("comment").value.trim();

    // Extract the blog post ID from the URL
    const urlParts = window.location.toString().split("/");
    const blogPost_id = urlParts[urlParts.length - 1];

    // Check if the comment content is not empty
    if (comment_content) {
        try {
            // Send POST request to create a new comment
            const response = await fetch("/api/comment", {
                method: "POST",
                body: JSON.stringify({
                    blogPost_id,
                    comment_content,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                // Reload the page to reflect the new comment
                document.location.reload();
            } else {
                // Alert the user if the response is not ok
                alert(response.statusText);
            }
        } catch (err) {
            // Handle network or other errors
            console.error("Error:", err);
            alert("An error occurred while submitting your comment.");
        }
    } else {
        // Alert if the comment content is empty
        alert("Please enter a comment.");
    }
}

// Attach event listener to the comment form
document.getElementById("comment-form").addEventListener("submit", newCommentHandler);
