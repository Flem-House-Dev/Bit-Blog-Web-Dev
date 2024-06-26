const logInHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#loginEmail").value.trim();
  const password = document.querySelector("#loginPw").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (response.ok) {
      document.location.href = "/";
    } else {
      // alert("Failed to login");
      displayErrorMessage(data.message);
    }
  }
};

function displayErrorMessage(message) {
  const errorMessageEl = document.querySelector('#error-message');
  errorMessageEl.textContent = message;
};

document.querySelector("#loginForm").addEventListener("submit", logInHandler);
