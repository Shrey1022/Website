
function handleFormSubmit(event) {
    event.preventDefault(); 
  
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
  
    if (name === "" || email === "" || message === "") {
      alert("Please fill in all fields.");
      return;
    }
  
    fetch("/submit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email, message: message }),
    })
      .then(function (response) {
        if (response.ok) {
          alert("Form submitted successfully!");
          // Clear the form fields
          document.getElementById("name").value = "";
          document.getElementById("email").value = "";
          document.getElementById("message").value = "";
        } else {
          throw new Error("Form submission failed.");
        }
      })
      .catch(function (error) {
        alert(error.message);
      });
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("contact-form");
    form.addEventListener("submit", handleFormSubmit);
  });
  