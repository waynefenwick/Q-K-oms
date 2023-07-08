// Purpose: To add a new post to the database when the user clicks the submit button on the dashboard page. 
async function newFormHandler(event) {
    event.preventDefault();
  
    // Get the title and post content from the form
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('input[name="post-content"]').value;
  
    // Send the title and post content to the server
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        post_content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  // If the response is ok, reload the page, otherwise display the error
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
  // Listen for the submit button to be clicked
  document
    .querySelector(".new-post-form")
    .addEventListener("submit", newFormHandler);
  