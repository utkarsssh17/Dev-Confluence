let counter=1;// step counter for the step location in create-event
document.addEventListener('DOMContentLoaded', function () {

    const dateInput = document.querySelector('#eventDate');
    
    // code to update the text in pageCounter element in create-event
   
    updateCounterText(counter)

    // eventLocation

    

    const now = new Date();
    const getCurrentDate = () => {
        const year = now.getFullYear();
        const month = (`0${now.getMonth() + 1}`).slice(-2);
        const day = (`0${now.getDate()}`).slice(-2);
        return `${year}-${month}-${day}`;
    };

    const currentDate = getCurrentDate();

    dateInput.setAttribute('min', currentDate);

    dateInput.addEventListener('change', (event) => {
        const selectedDate = new Date(event.target.value);

        if (selectedDate < now) {
            alert('Please select a future date');
            event.target.value = currentDate;
        }
    });

    const photoInput = document.querySelector('#eventPhotos');
    const previewDiv = document.querySelector('#photoPreview');
    const photoCount = document.querySelector('#photoCount');

    photoInput.addEventListener('change', (event) => {
        const files = event.target.files;

        if (files.length > 5) {
            alert('You can only upload up to 5 photos');
            photoInput.value = '';
            return;
        }

        photoCount.innerHTML = `${files.length} photos selected`;
        previewDiv.innerHTML = '';

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = (e) => {
                const imgWrapper = document.createElement('div');
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxHeight = "200px";
                img.style.maxWidth = "200px";
                img.classList.add('preview-img');
                const removeBtn = document.createElement('button');
                removeBtn.innerHTML = 'Remove';
                removeBtn.classList.add('btn', 'btn-danger', 'btn-sm');
                removeBtn.addEventListener('click', () => {
                    imgWrapper.remove();
                    const previewImgs = previewDiv.querySelectorAll('.preview-img');
                    photoCount.innerHTML = `${previewImgs.length} photos selected`;
                });
                imgWrapper.appendChild(img);
                imgWrapper.appendChild(removeBtn);
                previewDiv.appendChild(imgWrapper);
            };
            reader.readAsDataURL(file);
        }
    });

    const createEventForm = document.getElementById('create-event-form');
    createEventForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(createEventForm);
        const selectedCategories = formData.getAll('eventCategory[]');

        try {
            const response = await fetch('/events/create', {
                method: 'POST',
                body: JSON.stringify({
                    eventTitle: formData.get('eventTitle'),
                    eventDescription: formData.get('eventDescription'),
                    eventLocation: formData.get('eventLocation'),
                    eventDate: formData.get('eventDate'),
                    eventTime: formData.get('eventTime'),
                    eventDuration: formData.get('eventDuration'),
                    eventCategory: selectedCategories,
                    eventMaxCapacity: formData.get('eventMaxCapacity'),
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (data.errors) {
                const errors = data.errors;
                errors.forEach((error) => {
                    alert(error.msg);
                });
            } else {
                const files = formData.getAll('eventPhotos');
                const imageFormData = new FormData();

                for (const file of files) {
                    if (file && file.size > 0) {
                        imageFormData.append('images', file);
                    }
                }

                if (imageFormData.has('images')) {
                    await fetch(`/images/event/${data.eventId}/upload`, {
                        method: 'POST',
                        body: imageFormData
                    });
                }

                // Redirect to event page
                window.location.href = `/events/${data.eventId}`;
            }
        } catch (error) {
            console.error(error);
        }
    });
    var input = document.getElementById('eventLocation');
    new google.maps.places.Autocomplete(input);
});
function forwarding(curr,next){
    currForm=document.getElementById("eventDetailsName"+curr);
    nextForm=document.getElementById("eventDetailsName"+next);
    counter=counter+1;
    currForm.style.display="none";
    nextForm.style.display="flex";
    updateCounterText()
    
}
function backing(curr,prev){
    currForm=document.getElementById("eventDetailsName"+curr);
    prevForm=document.getElementById("eventDetailsName"+prev);
    counter=counter-1;
    currForm.style.display="none";
    prevForm.style.display="flex";
    updateCounterText()
}
function updateCounterText(){
    text=document.getElementById("pageCounter");
    text.innerText=counter;
}
function b1checker(){
   
    if(document.getElementById('eventTitle').value && document.getElementById('eventDescription').value && document.getElementById('eventMaxCapacity').value){
        document.getElementById('Button1').style.display="flex";
    }
    else{
        document.getElementById('Button1').style.display="none";

    }
}
function b2checker(){
    if(document.getElementById('eventLocation').value && document.getElementById('eventDate').value && document.getElementById('eventTime').value &&  document.getElementById('eventDuration').value ){
        document.getElementById('Button2').style.display="flex";
    }
    else{
        document.getElementById('Button2').style.display="none";

    }
}