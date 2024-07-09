async function fetchTutors() {
    try {
        const response = await fetch('/tutors');
        const tutors = await response.json();

        const tutorsContainer = document.getElementById('tutorsContainer');
        tutorsContainer.innerHTML = '';

        tutors.forEach(tutor => {
            const tutorElement = document.createElement('div');
            tutorElement.classList.add('box');
            tutorElement.innerHTML = `
                <div class="tutor">
                    <img src="images/tutor.png" alt="">
                    <div>
                        <h3>${tutor.name}</h3>
                    </div>
                </div>
                <p>Cursos totales : <span>${tutor.total_courses}</span></p>
                 <a href="teacher_profile.html?id=${tutor.id}" class="inline-btn">Mirar Perfil</a>
            `;
            tutorsContainer.appendChild(tutorElement);
        });
    } catch (error) {
        console.error('Error fetching tutors:', error);
        alert('Hubo un problema al cargar la lista de instructores');
    }
}

window.onload = () => {
    fetchTutors();
};
