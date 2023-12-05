document.addEventListener('DOMContentLoaded', () => {
    const completeProfileForm = document.getElementById('edit-profile-form');
    const avatarContainer = document.querySelector(".custom-card-avatar-container");
    const fileInput = document.getElementById('image');

    // Add an event listener to the file input for image preview
    fileInput.addEventListener('change', () => {
        const selectedFile = fileInput.files[0];
        const fileSizeErrorContainer = document.getElementById('file-size-error');
    
        // Clear previous error messages
        fileSizeErrorContainer.textContent = '';
    
        if (selectedFile) {
            // Set the file size limit (in bytes)
            const fileSizeLimit = (5 * 1024 * 1024) / 10; // 5 KB
    
            if (selectedFile.size > fileSizeLimit) {
                // Display an error message on the page
                fileSizeErrorContainer.textContent = 'File size exceeds 500 KB';
            } else {
                const reader = new FileReader();
    
                reader.onload = function (e) {
                    avatarContainer.src = e.target.result;
                };
    
                reader.readAsDataURL(selectedFile);
            }
        }
    });
    

    completeProfileForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(completeProfileForm);

        try {
            // Make first request to the /user/username/edit route
            await fetch(`/user/${formData.get('hiddenUsername')}/edit`, {
                method: 'POST',
                body: JSON.stringify({
                    firstName: formData.get('firstName'),
                    lastName: formData.get('lastName'),
                    username: formData.get('hiddenUsername'),
                    email: formData.get('email'),
                    dob: formData.get('dob'),
                    location: formData.get('location'),
                    bio: formData.get('bio')
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Make second request to the /images/upload route 
            const file = formData.get('image');
            if (file && file.size > 0) {
                const imageFormData = new FormData();
                imageFormData.append('image', file);
                await fetch('/images/upload', {
                    method: 'POST',
                    body: imageFormData
                });
            }

            // Redirect to profile page
            window.location.href = `/user/profile`;
        } catch (error) {
            console.error(error);
        }
    });
});