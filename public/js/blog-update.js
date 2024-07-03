// Text area focus on page load
document.addEventListener('DOMContentLoaded', () => {
    const textArea = document.querySelector('#blog-text-area');
    if (textArea) {
        textArea.focus();
        textArea.setSelectionRange(textArea.value.length, textArea.value.length);
    }
});

// Blog form update handler
const blogFormUpdateHandler = async (event) => {
    event.preventDefault();

    // Query selection
    const blogForm = document.getElementById("blog-update-form");

    const formData = new FormData(blogForm);
    const blogData = {
        id: formData.get("blog-id"),
        title: formData.get("blog-form-title"),
        content: formData.get("blog-text-area"),
    };

    try {
        // Fetch api
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

// Event handler

document
    .querySelector("#blog-update-form")
    .addEventListener("submit", blogFormUpdateHandler);
