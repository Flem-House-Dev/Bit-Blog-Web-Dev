// Delete user handler
async function deleteUser(userId) {

    // Confirm delete user
    const confirmDeleteAcct = confirm("Are you sure you want to delete your account?");

    if (confirmDeleteAcct) {
        try {
            // Fetch api
            const response = await fetch('/api/users/', {
                method: 'DELETE',
            });
            const data = await response.json();
        } catch (err) {
            console.error("Error: ", err);
        }
    }
    window.location.reload();
};

// Event handler
document
    .querySelector("#deleteUserBtn")
    .addEventListener("click", deleteUser);