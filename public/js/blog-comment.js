// ---- Post comment ----
const commentPostHandler = async () => {
    try {
        const commentTextContent = document
            .querySelector("#comment-textarea")
            .value.trim();
        const pathSegments = window.location.pathname.split("/");
        if (pathSegments.length > 2) {
            blogId = pathSegments[2];
        } else {
            console.error("Error: Unable to determine blog ID from URL");
            return;
        }

        if (commentPostHandler) {
            const response = await fetch("/api/blog-comment", {
                method: "POST",
                body: JSON.stringify({ commentTextContent, blogId }),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                window.location.reload();
            }
        }
    } catch (err) {
        console.error(err);
    }
};

// ----- Update comment -----

const commentUpdateHandler = async (event) => {
    const commentId = event.target.getAttribute("data-comment-id");
    const commentTextArea = document.querySelector(
        `#comment-textarea-${commentId}`
    );
    const commentText = commentTextArea.value.trim();

    if (commentText) {
        try {
            const response = await fetch(`/api/blog-comment/${commentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text_content: commentText }),
            });

            if (response.ok) {
                window.location.reload();
            } else {
                console.error("Error updating comment", response.statusText);
            }
        } catch (err) {
            console.error("Error:", err);
        }
    }
};

// ----- Delete comment -----

const commentDeleteHandler = async (event) => {
    const confirmDelete = confirm("Are you want to delete this comment?");

    if (confirmDelete) {
        try {
            // console.log("delete button pressed");
            const id = event.target.dataset.commentId;
            const response = await fetch(`../api/blog-comment/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                window.location.reload();
            }
        } catch (err) {
            console.error("There was a problem deleting the post.", err);
        }
    }
};

// ---------- Event handlers ----------
document.addEventListener("DOMContentLoaded", () => {
    // -- Add comment
    
    document
        .querySelector("#save-comment-btn")
        .addEventListener("click", commentPostHandler);

    // -- Update comment
    const updateButtons = document.querySelectorAll("#update-comment-btn");

    updateButtons.forEach((button) => {
        button.addEventListener("click", commentUpdateHandler);
    });

    // -- Delete Comment
    const deleteButtons = document.querySelectorAll(".delete-comment");

    deleteButtons.forEach((button) => {
        button.addEventListener("click", commentDeleteHandler);
    });

    // -- Open/Close modal
    const commentModals = document.querySelectorAll(".modal");
    commentModals.forEach((modal) => {
        modal.addEventListener("hidden.bs.modal", function () {
            const form = modal.querySelector("form");
            form.reset();
        });

        // Select text field when udate comment modal opens
        modal.addEventListener("show.bs.modal", (event) => {
            const modalId = event.target.getAttribute("id");

            let textArea
            // const textArea = document.querySelector(
            //     `#comment-textarea-${modalId.split("-")[2]}`
            // );
            // console.log("textArea: ", textArea);

            if(modalId === "new-comment-modal") {
                textArea = document.querySelector("#new-comment-textarea");
            }
            else {
                const commentId = modalId.split("-")[2];
                textArea = document.querySelector(`#comment-textarea-${commentId}`);
            }

            console.log("Modal ID: ", modalId);  // Debugging step
            console.log("Text Area: ", textArea);  // Debugging step

            if (textArea) {
                setTimeout(() => {
                    textArea.focus();
                    textArea.setSelectionRange(
                        textArea.value.length,
                        textArea.value.length
                    );
                }, 200);
            }
        });
    });
    // document.addEventListener('DOMContentLoaded', function () {
    //     var commentModal = document.getElementById('comment-modal');
    //     var commentForm = document.getElementById('comment-form');

    //     commentModal.addEventListener('hidden.bs.modal', function () {
    //         commentForm.reset();
    //     });
    // });
});
