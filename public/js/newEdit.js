document.addEventListener("DOMContentLoaded", () => {
    // Extract blog post ID from URL
    let blogPostId = window.location.pathname.split("/")[2];

    const submitEdit = async (event) => {
        event.preventDefault();

        // Get form values
        const title = document.getElementById("titleInput").value;
        const description = document.getElementById("bodyInput").value;

        if (title && description) {
            // Send PUT request to update blog post
            const response = await fetch(`/api/blogPost/${blogPostId}`, {
                method: "PUT",
                body: JSON.stringify({
                    title,
                    description,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                // Redirect to dashboard if successful
                document.location.assign("/dashboard");
            } else {
                // Display error message if request failed
                alert(response.statusText);
            }
        } else {
            // Alert if form fields are empty
            alert("Please fill out all fields.");
        }
    };

    // Attach event listener to form
    const formElement = document.getElementById("submitEdit");
    if (formElement) {
        formElement.addEventListener("submit", submitEdit);
    } else {
        console.error("Form element not found.");
    }
});