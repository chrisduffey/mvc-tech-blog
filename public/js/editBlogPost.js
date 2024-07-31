let blogPost = window.location.pathname.split("/");

const editPost = async (event) => {
    event.preventDefault();


    const comment_content = document.getElementById("editBtn").value.trim();

    document.location.assign(`/create/${blogPost[2]}`);
};

const editButton = document.querySelectorAll("#editBtn");

for (let i = 0; i< editButton.length; i++) {
    editButton[i]. addEventListener("click", editPost);
}