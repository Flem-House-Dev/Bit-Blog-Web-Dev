// Sign up handler function
const signUpFormHandler = async (event) => {
    event.preventDefault();

    // Display error function
    function displayErrorMessage(message) {
        const errorMessageEl = document.querySelector("#signup-error-message");
        errorMessageEl.textContent = message;
    }

    // Query selectors
    const username = document.querySelector("#signUpUserName").value.trim();
    const email = document.querySelector("#signUpEmail").value.trim();
    const password = document.querySelector("#signUpPw").value.trim();

    // Fetch api
    if (username && email && password) {
        const response = await fetch("/api/users/sign-up", {
            method: "POST",
            body: JSON.stringify({ username, email, password }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            window.location.href = "/";
        } else {
            const errorData = await response.json();
            if (errorData.errors) {
                const errorMessage = `${errorData.message}\n${errorData.errors.join(
                    "\n"
                )}`;
                displayErrorMessage(errorMessage);
            } else {
                displayErrorMessage(errorData.message || "Failed to sign up");
            }
            console.log(errorData);
        }
    } else {
        displayErrorMessage("Please fill in all fields");
    }
};

// Event listener
document
    .querySelector("#signUpForm")
    .addEventListener("submit", signUpFormHandler);
