// Purpose: To allow users to comment on posts
async function commentFormHandler(event) {
    event.preventDefault();
  // Get the comment text from the form
    const comment_text = document
      .querySelector('textarea[name="comment-body"]')
      .value.trim();
  
  // Get the post id from the url
    const post_id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
  
  // If the comment text exists, send the comment text and post id to the server
    if (comment_text) {
      const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({
          post_id,
          comment_text,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  }
    
  document
    .querySelector(".comment-form")
    .addEventListener("submit", commentFormHandler);
  