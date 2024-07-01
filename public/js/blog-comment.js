const commentPostHandler = async () => {
    try {
        
        const commentTextContent = document.querySelector('#comment-textarea').value.trim();
        const pathSegments = window.location.pathname.split('/');
        if(pathSegments.length > 2) {
            blogId = pathSegments[2];
        } else {
            console.error("Error: Unable to determine blog ID from URL");
            return;
        }

        if(commentPostHandler) {
            const response = await fetch('/api/blog-comment', {
                method: 'POST',
                body: JSON.stringify({ commentTextContent, blogId }),
                headers: { "Content-Type": "application/json"},
            });

            if(response.ok) {
                window.location.reload();
            };
        }

    } catch (err) {
        console.error(err);
    }
};

document
    .querySelector('#save-comment-btn')
    .addEventListener('click', commentPostHandler);