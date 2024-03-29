// Purpose: To edit a post
async function editFormHandler(event) {
  event.preventDefault();

  // Get the title and post_content from the form, and the post id from the URL
  const title = document.querySelector('input[name="post-title"]').value.trim();
  const post_content = document.querySelector('input[name="post-content"]').value.trim();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      post_content
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}

document.querySelector(".edit-post-form").addEventListener("submit", editFormHandler);
