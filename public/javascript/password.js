document.addEventListener("DOMContentLoaded", function () {
     const rememberPasswordCheckbox = document.querySelector("#remPsword");
     const emailInput = document.querySelector("#email");
     const passwordInput = document.querySelector("#password");
     const logoutButton = document.querySelector("#logoutBtn");
   
     // Check if the user previously selected the "Remember Password" option
     if (localStorage.getItem("rememberPassword") === "true") {
       emailInput.addEventListener("input", function () {
         if (emailInput.value === localStorage.getItem("savedEmail")) {
           passwordInput.value = localStorage.getItem("savedPassword");
         } else {
           passwordInput.value = "";
         }
       });
   
       if (localStorage.getItem("savedEmail") === emailInput.value) {
         passwordInput.value = localStorage.getItem("savedPassword");
       }
   
       emailInput.value = localStorage.getItem("savedEmail");
     } else {
       emailInput.value = ""; // Clear the email field if the "Remember Password" checkbox is not checked
     }
   
     // Add an event listener to the checkbox to save the email and password to local storage
     rememberPasswordCheckbox.addEventListener("change", function () {
       if (rememberPasswordCheckbox.checked) {
         localStorage.setItem("rememberPassword", "true");
         localStorage.setItem("savedEmail", emailInput.value);
         localStorage.setItem("savedPassword", passwordInput.value);
       } else {
         localStorage.setItem("rememberPassword", "false");
       }
     });
   
     // Add an event listener to the logout button
     logoutButton.addEventListener("click", function () {
       emailInput.value = ""; // Clear the email field
       passwordInput.value = ""; // Clear the password field
       emailInput.blur(); // Remove focus from the email field
     });
   
     // Clear the email field on page load
     emailInput.value = "";
   });
   