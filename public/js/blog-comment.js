// ---- Post comment ----
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

// ----- Update comment -----

const commentUpdateHandler = async (event) => {
    
    const updatedCommentText = document.getElementById
};

// ----- Delete comment -----

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

// ---------- Event handlers ----------
// -- Add comment
document
    .querySelector('#save-comment-btn')
    .addEventListener('click', commentPostHandler);

// -- Update comment
const updateButtons = document.querySelectorAll('.update-comment');

updateButtons.forEach(button => {
    button.addEventListener('click', commentUpdateHandler);
});

// -- Delete Comment
const deleteButtons = document.querySelectorAll('.delete-comment');

deleteButtons.forEach(button => {
    button.addEventListener('click', commentDeleteHandler);
});

// -- Close modal
document.addEventListener('DOMContentLoaded', function() {
    var commentModal = document.getElementById('comment-modal');
    var commentForm = document.getElementById('comment-form');

    commentModal.addEventListener('hidden.bs.modal', function () {
      commentForm.reset();
    });
  });