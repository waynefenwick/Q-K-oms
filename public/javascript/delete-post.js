// Purpose: Delete a post from the database
async function deleteFormHandler(event) {
    event.preventDefault();
// Get the post id from the url
    const id = window.location.toString().split("/")[
        window.location.toString().split("/").length - 1
      ];
    // Send the post id to the server
      const response = await fetch(`/api/posts/${id}`, {
        // Use the DELETE method to delete the post from the database 
        method: "DELETE"
      });
      // If the response is ok, reload the page, otherwise display the error
      if (response.ok) {
        document.location.replace("/dashboard/");
      } else {
        alert(response.statusText);
      }
}
// Listen for the delete button to be clicked
document.querySelector(".delete-post-btn").addEventListener("click", deleteFormHandler);