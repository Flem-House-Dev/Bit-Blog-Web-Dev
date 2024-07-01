const commentPostHandler = async () => {
    try {
        const commentTextContent = document.querySelector('#comment-textarea').value.trim();
        const pathSegments = window.location.pathname.split('/');
        if (pathSegments.length > 2) {
            blogId = pathSegments[2];
        } else {
            console.error("Error: Unable to determine blog ID from URL");
            return;
        }

        if (commentPostHandler) {
            const response = await fetch('/api/blog-comment', {
                method: 'POST',
                body: JSON.stringify({ commentTextContent, blogId }),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                window.location.reload();
            };
        }

    } catch (err) {
        console.error(err);
    }
};

// ----- Delete Comments -----

const commentDeleteHandler = async (event) => {

    const confirmDelete = confirm('Are you want to delete this comment?');

    if (confirmDelete) {
        try {
            // console.log("delete button pressed");
            const id = event.target.dataset.commentId;
            const response = await fetch(`../api/blog-comment/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                window.location.reload();
            }
        }
        catch (err) {
            console.error("There was a problem deleting the post.", err);
        }
    }
};

// ----- Event handlers -----
document
    .querySelector('#save-comment-btn')
    .addEventListener('click', commentPostHandler);

const deleteButtons = document.querySelectorAll('.delete-comment');

deleteButtons.forEach(button => {
    button.addEventListener('click', commentDeleteHandler);
});