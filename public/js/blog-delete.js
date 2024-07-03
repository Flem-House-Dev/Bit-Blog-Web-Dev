// Delete blog handler
const deleteBlogHandler = async (event) => {

    // Confirm delete
    const confirmDelete = confirm(
        "Are you sure you want to delete this blog post?"
    );

    if (confirmDelete) {
        try {
            // Fetch api
            const id = event.target.dataset.id;
            const response = await fetch(`../api/blog-delete/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                window.location.href = "/";
            }
        } catch (err) {
            console.error("There was a problem with deleting the blog.", err);
        }
    }
};

// Event handler
document
    .querySelector("#delete-post-btn")
    .addEventListener("click", deleteBlogHandler);
