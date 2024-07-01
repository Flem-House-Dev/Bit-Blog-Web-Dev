async function deleteUser (userId) {
    const confirmDeleteAcct = confirm("Are you sure you want to delete your account?");

    if(confirmDeleteAcct) {
        try {
            const response = await fetch('/api/users/', {
                method: 'DELETE',
            });
            const data = await response.json();
        } catch (err) {
            console.error("Error: ",err);
        }
    }
    window.location.href = "/";
};

document
    .querySelector("#deleteUserBtn")
    .addEventListener("click", deleteUser);