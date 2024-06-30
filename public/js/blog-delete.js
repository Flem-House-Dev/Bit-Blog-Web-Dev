const deleteBlogHandler = async (event) => {

    // console.log(event);
    // if(event.target.hasAttribute('data-id')) {
    //     const id = event.target.getAttribute('data-id');
    // }

    const confirmDelete = confirm('Are you sure you want to delete this blog post?');

    if(confirmDelete) {
        try {
            const id = event.target.dataset.id;

            console.log("id to delete: ", id);
            const response = await fetch(`../api/blog-delete/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                window.location.href = '/';
            } 
        } catch (err) {
            console.error('There was a problem with deleting the blog.', err);
        }

    }
};

document.querySelector('#delete-post-btn').addEventListener("click", deleteBlogHandler);