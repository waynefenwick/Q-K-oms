// login.js
// Purpose: login.js is used to handle the login and signup forms on the login page.
async function loginFormHandler(event) {
  event.preventDefault();
  // Get the email and password from the form 
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();
  // If the email and password exist, send the email and password to the server 
  if (email && password) {
    const response = await fetch("/api/users/login", {
      // Use the POST method to send the email and password to the server
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    // If the response is ok, redirect to the dashboard page, otherwise display the error
    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      alert('Sorry, but you have not yet signed up!');
    }
  }
}

// Purpose: To sign up a new user
async function signupFormHandler(event) {
  event.preventDefault();
  // Get the username, email, and password from the form
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();
  // if the email and password are not empty, send the email and password to the server
  if (email && password) {
    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector(".signinBtn").addEventListener("click", loginFormHandler);
document.querySelector(".signupBtn").addEventListener("click", signupFormHandler);
