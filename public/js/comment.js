document.querySelector('.comment-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const postId = document.querySelector('input[name="post-id"]').value;
    const commentText = document.querySelector('textarea[name="comment"]').value.trim();

    if (commentText) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                postId,
                commentText
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to add comment');
        }
    }
});
