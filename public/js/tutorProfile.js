async function fetchTutorDetails(tutorId) {
    try {
        const response = await fetch(`/tutors/${tutorId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const tutorDetails = await response.json();

        if (tutorDetails.error) {
            console.error(tutorDetails.error);
            alert(tutorDetails.error);
            return;
        }

        if (!tutorDetails.length) {
            console.error('No se encontraron detalles para el tutor.');
            alert('No se encontraron detalles para el tutor');
            return;
        }

        const tutor = tutorDetails[0];

        document.getElementById('tutorName').innerText = tutor.name;
        document.getElementById('totalCourses').innerText = tutor.total_courses;

        const coursesContainer = document.getElementById('coursesContainer');
        coursesContainer.innerHTML = '';

        tutorDetails.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.classList.add('box');
            courseElement.innerHTML = `
                <div class="thumb">
                    <img src="${course.thumb}" alt="${course.title}">
                    <h2>${tutor.name}</h2>
                </div>
                <h3 class="title">${course.title}</h3>
                <a href="playlist.html" class="inline-btn">Mirar Curso</a>
            `;
            coursesContainer.appendChild(courseElement);
        });
    } catch (error) {
        console.error('Error fetching tutor details:', error);
        alert('Hubo un problema al cargar los detalles del tutor');
    }
}

const urlParams = new URLSearchParams(window.location.search);
const tutorId = urlParams.get('id');

if (tutorId) {
    fetchTutorDetails(tutorId);
} else {
    console.error('No se proporcionó un ID de tutor');
}
