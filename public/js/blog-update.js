const blogFormUpdateHandler = async (event) => {
    event.preventDefault();

    const blogForm = document.getElementById("blog-update-form");

    const formData = new FormData(blogForm);
    const blogData = {
        id: formData.get("blog-id"),
        title: formData.get("blog-form-title"),
        content: formData.get("blog-text-area"),
    };

    console.log("Blog data: ",blogData);

    try {
        const response = await fetch(`/api/blog-form/${blogData.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(blogData),
        });

        if (response.ok) {
            blogForm.reset();
            window.location.href = `/blog/${blogData.id}`;
        } else {
            console.error("Error updating blog post", response.statusText);
        }
    } catch (err) {
        console.error("Error", err);
    }
};

document
    .querySelector("#blog-update-form")
    .addEventListener("submit", blogFormUpdateHandler);
