async function fetchCourseDetails(courseId) {
    try {
        console.log(`Fetching course details for course ID: ${courseId}`);
        const response = await fetch(`/cursos/${courseId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const course = await response.json();
        console.log('Course details fetched:', course);

        if (!course) {
            throw new Error('Course not found');
        }

        document.getElementById('cursoThumb').src = course.thumb || 'images/default-thumb.png';
        document.getElementById('tutorName').innerText = course.tutor_name || 'Nombre del Tutor';
        document.getElementById('cursoTitle').innerText = course.title || 'Título del Curso';
        document.getElementById('cursoDescription').innerText = course.description || 'Descripción del Curso';
        document.getElementById('tutorProfileLink').href = `teacher_profile.html?id=${course.tutor_id}`;

        const lessonsContainer = document.getElementById('lessonsContainer');
        lessonsContainer.innerHTML = '';

        if (course.lessons) {
            course.lessons.forEach(lesson => {
                const lessonElement = document.createElement('a');
                lessonElement.classList.add('box');
                lessonElement.href = `video.html?id=${lesson.id}`;
                lessonElement.innerHTML = `
                    <i class="fas fa-play"></i>
                    <img src="${lesson.thumb || 'images/default-thumb.png'}" alt="${lesson.title}">
                    <h3>${lesson.title}</h3>
                `;
                lessonsContainer.appendChild(lessonElement);
            });
        } else {
            console.warn('No lessons found for this course');
        }
    } catch (error) {
        console.error('Error fetching course details:', error);
        alert('Hubo un problema al cargar los detalles del curso');
    }
}

// Obtener el ID del curso desde la URL
const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('id');

if (courseId) {
    fetchCourseDetails(courseId);
} else {
    console.error('No se proporcionó un ID de curso');
}
