const blogFormSubmitHandler = async (event) => {
    event.preventDefault();

    const blogForm = document.getElementById("blog-post-form");

    const formData = new FormData(blogForm);
    const blogData = {
        title: formData.get("blog-form-title"),
        content: formData.get("blog-text-area"),
    };

    try {
        const response = await fetch("/api/blog-form/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(blogData),
        });

        if (response.ok) {
            blogForm.reset();
            window.location.href = "/";
        } else {
            console.error("Error creating blog post", response.statusText);
        }
    } catch (err) {
        console.error("Error", err);
    }
};

document
    .querySelector("#blog-post-form")
    .addEventListener("submit", blogFormSubmitHandler);
