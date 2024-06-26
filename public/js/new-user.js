const signUpFormHandler = async (event) => {
    event.preventDefault();

    const userName = document.querySelector("#signUpUserName").value.trim();
    const email = document.querySelector("#signUpEmail").value.trim();
    const password = document.querySelector("#signUpPw").value.trim();

    if (userName && email && password) {
        const response = await fetch("/api/users/sign-up", {
            method: post,
            body: JSON.stringify({ userName, email, password }),
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
