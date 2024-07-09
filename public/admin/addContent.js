// Función para obtener y mostrar los tutores
function fetchTutors() {
    fetch('http://localhost:3000/tutors')
        .then(response => response.json())
        .then(tutors => {
            const tutorSelect = document.getElementById('tutor');
            tutors.forEach(tutor => {
                const option = document.createElement('option');
                option.value = tutor.id;
                option.textContent = tutor.name;
                tutorSelect.appendChild(option);
            });

            // Agregar evento change para el select de tutores
            tutorSelect.addEventListener('change', fetchCursos);
        })
        .catch(error => {
            console.error('Error fetching tutors:', error);
        });
}

// Función para obtener y mostrar los cursos del tutor seleccionado
function fetchCursos() {
    const tutorSelect = document.getElementById('tutor');
    const tutorId = tutorSelect.value;
    console.log('Selected tutor ID:', tutorId); // Para depuración

    // Limpiar el select de cursos
    const cursoSelect = document.getElementById('curso');
    cursoSelect.innerHTML = '';

    if (tutorId) {
        fetch(`http://localhost:3000/cursos/tutor?tutorId=${tutorId}`)
            .then(response => response.json())
            .then(cursos => {
                console.log('Fetched cursos:', cursos); // Para depuración
                cursos.forEach(curso => {
                    const option = document.createElement('option');
                    option.value = curso.id;
                    option.textContent = curso.title;
                    cursoSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error fetching cursos:', error);
            });
    }
}

// Función para manejar la creación de una lección
function handleCreateLeccion(event) {
    event.preventDefault();

    const form = document.getElementById('leccionForm');
    const formData = new FormData(form);

    fetch('http://localhost:3000/lecciones', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(result => {
            if (result.error) {
                alert('Error creando la lección: ' + result.error);
            } else {
                alert('Lección creada exitosamente');
                // Vaciar los campos del formulario
                form.reset();
            }
        })
        .catch(error => {
            console.error('Error creating leccion:', error);
        });
}

window.onload = () => {
    fetchTutors();
    document.getElementById('leccionForm').addEventListener('submit', handleCreateLeccion);
};
