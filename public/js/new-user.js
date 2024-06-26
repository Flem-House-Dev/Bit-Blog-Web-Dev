const signUpFormHandler = async (event) => {
    event.preventDefault();

    console.log('sign up....');

    const username = document.querySelector("#signUpUserName").value.trim();
    const email = document.querySelector("#signUpEmail").value.trim();
    const password = document.querySelector("#signUpPw").value.trim();

    if (username && email && password) {
        const response = await fetch("/api/users/sign-up", {
            method: "POST",
            body: JSON.stringify({ username, email, password }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Failed to sign up");
        }
    }
};

document
    .querySelector("#signUpForm")
    .addEventListener("submit", signUpFormHandler);
