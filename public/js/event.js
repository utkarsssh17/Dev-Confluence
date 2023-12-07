document.addEventListener('DOMContentLoaded', function () {

    const deleteEventButton = document.querySelector('.delete-event-btn');

    if (deleteEventButton) {
        deleteEventButton.addEventListener('click', () => {
            const eventId = deleteEventButton.dataset.eventId;
            fetch(`/events/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('messageContainer', '.event-row');
                    const successMessage = {
                        text: data.successMessage,
                        type: 'success'
                    }
                    const errorMessage = {
                        text: data.errorMessage,
                        type: 'error'
                    }
                    if (successMessage.text) {
                        localStorage.setItem('alertMessage', JSON.stringify(successMessage));
                        window.location.href = '/';
                    } else if (errorMessage.text) {
                        localStorage.setItem('alertMessage', JSON.stringify(errorMessage));
                        window.location.reload();
                    }
                })
                .catch(error => console.error(error));
        });
    }

    const editEventButton = document.querySelector('.edit-event-btn');
    if (editEventButton) {
        editEventButton.addEventListener('click', () => {
            const eventId = editEventButton.dataset.eventId;
            window.location.href = `/events/${eventId}/edit`;
        });
    }

    window.addEventListener('load', () => {
        const containerName = localStorage.getItem('messageContainer');
        const container = document.querySelector(containerName);
        const alertMessage = JSON.parse(localStorage.getItem('alertMessage'));
        if (!container) return;
        if (!alertMessage) return;
        const alert = document.createElement('div');
        alert.classList.add('alert');
        if (alertMessage.type === 'success') {
            alert.classList.add('alert-success');
        } else if (alertMessage.type === 'error') {
            alert.classList.add('alert-danger');
        }
        alert.textContent = alertMessage.text;
        container.insertBefore(alert, container.firstChild);
        localStorage.removeItem('messageContainer');
        localStorage.removeItem('alertMessage');
    });
});
document.addEventListener("DOMContentLoaded", function () {
    var contentPara = document.getElementById("contentPara");
    var content = contentPara.textContent;
    var wordCount = content.split(" ").length;

    if (wordCount > 50) {
        var truncatedContent = content.split(" ").splice(0, 50).join(" ");
        contentPara.textContent = truncatedContent + "...";
        document.getElementById("seeMoreBtn").classList.remove("d-none");

        document.getElementById("seeMoreBtn").addEventListener("click", function () {
            document.getElementById("fullContent").textContent = content;
            document.getElementById("seeMoreModal").classList.add("show");
            document.getElementById("seeMoreModal").style.display = "block";
        });

        document.querySelector("#seeMoreModal .close").addEventListener("click", function () {
            document.getElementById("seeMoreModal").classList.remove("show");
            document.getElementById("seeMoreModal").style.display = "none";
        });
    }
});