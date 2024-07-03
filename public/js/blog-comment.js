// ---- Post comment handler----
const commentPostHandler = async () => {

    try {
        // Query selector
        const commentTextContent = document
            .querySelector("#new-comment-textarea")
            .value.trim();
        const pathSegments = window.location.pathname.split("/");
        if (pathSegments.length > 2) {
            blogId = pathSegments[2];
        } else {
            console.error("Error: Unable to determine blog ID from URL");
            return;
        }

        // Fetch api
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

// ----- Update comment handler-----
const commentUpdateHandler = async (event) => {

    // Query selector
    const commentId = event.target.getAttribute("data-comment-id");
    const commentTextArea = document.querySelector(
        `#comment-textarea-${commentId}`
    );
    const commentText = commentTextArea.value.trim();

    // Fetch api
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

// ----- Delete comment handler -----
const commentDeleteHandler = async (event) => {

    // Confirm delete
    const confirmDelete = confirm("Are you want to delete this comment?");

    if (confirmDelete) {
        try {
            // Fetch api
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
    
    // -- Add comment btn
    document
        .querySelector("#save-comment-btn")
        .addEventListener("click", commentPostHandler);

    // -- Update comment btn
    const updateButtons = document.querySelectorAll("#update-comment-btn");

    updateButtons.forEach((button) => {
        button.addEventListener("click", commentUpdateHandler);
    });

    // -- Delete Comment btn
    const deleteButtons = document.querySelectorAll(".delete-comment");

    deleteButtons.forEach((button) => {
        button.addEventListener("click", commentDeleteHandler);
    });

    // -- Open/Close modal btns
    const commentModals = document.querySelectorAll(".modal");
    commentModals.forEach((modal) => {
        modal.addEventListener("hidden.bs.modal", function () {
            const form = modal.querySelector("form");
            form.reset();
        });

        // Automatically focus text field when new or udate comment modals open
        modal.addEventListener("show.bs.modal", (event) => {

            // query selection for comment modals
            const modalId = event.target.getAttribute("id");
            let textArea
            if (modalId === "new-comment-modal") {
                textArea = document.querySelector("#new-comment-textarea");
            }
            else {
                const commentId = modalId.split("-")[2];
                textArea = document.querySelector(`#comment-textarea-${commentId}`);
            }

            // Text area focus on modal open
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
});

// const pTIme = document.querySelectorAll('.post-time');
// const pdate = pTIme.dataset;
// console.log(pdate);

document.addEventListener('DOMContentLoaded', () => {

    const pTimes = document.querySelectorAll('.post-time');
    pTimes.forEach(pTime => {
        const dateString = pTime.dataset.date;
        const date = new Date(dateString);
        
            // console.log(dateString);
        
        if (!isNaN(date.getTime())) {  // Check if date is valid
            const options = { 
                year: 'numeric', 
                month: 'numeric', 
                day: 'numeric', 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true
            };
            console.log(pTimes);
            pTime.textContent = date.toLocaleString(undefined, options);
        }
    })
});

document.addEventListener('DOMContentLoaded', () => {
    const pTime = document.querySelector('#p-time');
    if (pTime) {
        const dateString = pTime.dataset.date;
        const date = new Date(dateString);
        
        if (!isNaN(date.getTime())) {  // Check if date is valid
            const options = { 
                year: 'numeric', 
                month: 'numeric', 
                day: 'numeric', 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true
            };
            pTime.textContent = date.toLocaleString(undefined, options);
        }
    }
});


