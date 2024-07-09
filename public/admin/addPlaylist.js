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
      })
      .catch(error => {
        console.error('Error fetching tutors:', error);
      });
  }

  function fetchCategorias() {
    fetch('http://localhost:3000/categorias')
      .then(response => response.json())
      .then(categorias => {
        const categoriaSelect = document.getElementById('categoria');
        categorias.forEach(categoria => {
          const option = document.createElement('option');
          option.value = categoria.id;
          option.textContent = categoria.nombre;
          categoriaSelect.appendChild(option);
        });
      })
      .catch(error => {
        console.error('Error fetching categorias:', error);
      });
  }

  // Función para manejar la creación de un curso
  function handleCreateCourse(event) {
    event.preventDefault();

    const form = document.getElementById('cursoForm');
    const formData = new FormData(form);

    fetch('http://localhost:3000/cursos', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(result => {
      if (result.error) {
        alert('Error creando el curso: ' + result.error);
      } else {
        alert('Curso creado exitosamente');
      }
    })
    .catch(error => {
      console.error('Error creating course:', error);
    });
  }

  // Llamar a la función para obtener los tutores cuando se carga la página
  window.onload = () => {
    fetchTutors();
    fetchCategorias();
    document.getElementById('cursoForm').addEventListener('submit', handleCreateCourse);
  };