const logInHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#loginEmail").value.trim();
  const password = document.querySelector("#loginPw");

  if (email && password) {
    const response = fetch("", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location("/");
    } else {
      alert("Failed to login");
    }
  }
};

document
    .querySelector("#loginForm")
    .addEventListener("submit", logInHandler);
