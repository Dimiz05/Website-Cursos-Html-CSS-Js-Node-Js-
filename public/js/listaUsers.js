// Función para obtener la lista de usuarios y cursos de la API
async function fetchUsers() {
  try {
      const response = await fetch('/tutors');
      const users = await response.json();

      const userList = document.getElementById('user-list');
      userList.innerHTML = '';

      users.forEach(user => {
          const tr = document.createElement('tr');

          const tdId = document.createElement('td');
          tdId.textContent = user.id;
          tdId.setAttribute('data-label', 'ID');
          tr.appendChild(tdId);

          const tdName = document.createElement('td');
          tdName.textContent = user.name;
          tdName.setAttribute('data-label', 'Nombre');
          tr.appendChild(tdName);

          userList.appendChild(tr);
      });
  } catch (error) {
      console.error('Error fetching users:', error);
  }
}

async function deleteCurso(id) {
  try {
    // Mostrar mensaje de confirmación antes de eliminar
    const confirmacion = confirm('¿Está seguro que desea eliminar este curso?');
    if (!confirmacion) {
      return; // Cancelar la eliminación si el usuario no confirma
    }

    const response = await fetch(`/cursos/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el curso');
    }

    // Eliminación exitosa, actualizar la tabla de cursos
    await fetchCursos(); // Llamar a fetchCursos() para actualizar la lista de cursos

    // Mostrar mensaje de éxito
    alert('Curso eliminado exitosamente');

  } catch (error) {
    console.error('Error al eliminar el curso:', error);
    // Manejar errores o mostrar un mensaje de error al usuario si es necesario
    alert('Ocurrió un error al eliminar el curso. Por favor, inténtelo de nuevo más tarde.');
  }
}

// Función para obtener la lista de cursos de la API
async function fetchCursos() {
  try {
      const response = await fetch('/cursos');
      const cursos = await response.json();

      const cursoList = document.getElementById('curso-list');
      cursoList.innerHTML = '';

      cursos.forEach(curso => {
          const tr = document.createElement('tr');

          const tdId = document.createElement('td');
          tdId.textContent = curso.id;
          tdId.setAttribute('data-label', 'ID');
          tr.appendChild(tdId);

          const tdTitle = document.createElement('td');
          tdTitle.textContent = curso.title;
          tdTitle.setAttribute('data-label', 'Título');
          tr.appendChild(tdTitle);

          const tdDescription = document.createElement('td');
          tdDescription.textContent = curso.description;
          tdDescription.setAttribute('data-label', 'Descripción');
          tr.appendChild(tdDescription);

          const tdCategoria = document.createElement('td');
          tdCategoria.textContent = curso.categoria_name;
          tdCategoria.setAttribute('data-label', 'Descripción');
          tr.appendChild(tdCategoria);

          const tdEdit = document.createElement('td');
          tdEdit.setAttribute('data-label', 'Editar');
          const editButton = document.createElement('button');
          editButton.textContent = 'Editar';
          editButton.className = 'edit';
          editButton.onclick = () => {
              window.location.href = `update_playlist.html?id=${curso.id}`;
          };
          tdEdit.appendChild(editButton);
          tr.appendChild(tdEdit);

          const tdDelete = document.createElement('td');
          tdDelete.setAttribute('data-label', 'Eliminar');
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Eliminar';
          deleteButton.className = 'delete';
          deleteButton.onclick = () => deleteCurso(curso.id);
          tdDelete.appendChild(deleteButton);
          tr.appendChild(tdDelete);

          cursoList.appendChild(tr);
      });
  } catch (error) {
      console.error('Error fetching cursos:', error);
  }
}


// JavaScript para manejar la creación de una nueva categoría y la lista de categorías existentes
document.addEventListener('DOMContentLoaded', () => {
  fetchCategorias(); // Cargar las categorías existentes al cargar la página

  const newCategoriaBtn = document.getElementById('newCategoriaBtn');
  newCategoriaBtn.addEventListener('click', () => {
      const nuevoNombre = prompt('Ingrese el nombre de la nueva categoría:');
      if (nuevoNombre) {
          createCategoria(nuevoNombre);
      }
  });
});

// Función para obtener la lista de categorias y cursos de la API
async function fetchCategorias() {
  try {
      const response = await fetch('/categorias');
      const categorias = await response.json();

      const categoriaList = document.getElementById('categorias-list');
      categoriaList.innerHTML = '';

      categorias.forEach(categoria => {
          const tr = document.createElement('tr');

          const tdId = document.createElement('td');
          tdId.textContent = categoria.id;
          tdId.setAttribute('data-label', 'ID');
          tr.appendChild(tdId);

          const tdName = document.createElement('td');
          tdName.textContent = categoria.nombre;
          tdName.setAttribute('data-label', 'Nombre');
          tr.appendChild(tdName);

          const tdEdit = document.createElement('td');
          tdEdit.setAttribute('data-label', 'Editar');
          const editButton = document.createElement('button');
          editButton.textContent = 'Editar';
          editButton.className = 'edit';
          editButton.onclick = () => {
            const nuevoNombre = prompt('Ingrese el nuevo nombre de la categoría:', categoria.nombre);
            if (nuevoNombre) {
              updateCategoria(categoria.id, nuevoNombre);
            }
          };
          tdEdit.appendChild(editButton);
          tr.appendChild(tdEdit);

          const tdDelete = document.createElement('td');
          tdDelete.setAttribute('data-label', 'Eliminar');
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Eliminar';
          deleteButton.className = 'delete';
          deleteButton.onclick = () => deleteCategoria(categoria.id);
          tdDelete.appendChild(deleteButton);
          tr.appendChild(tdDelete);

          categoriaList.appendChild(tr);
      });
  } catch (error) {
      console.error('Error fetching users:', error);
  }
}


async function createCategoria(nombre) {
  try {
      const response = await fetch('/categorias', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nombre: nombre })
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Nueva categoría creada:', data);
          fetchCategorias(); // Actualizar la lista de categorías después de la creación
      } else {
          console.error('Error al crear la categoría:', response.statusText);
      }
  } catch (error) {
      console.error('Error creating categoria:', error);
  }
}

async function updateCategoria(id, nuevoNombre) {
  try {
    const response = await fetch(`/categorias/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre: nuevoNombre })
    });
    
    if (response.ok) {
      alert('Categoría actualizada correctamente');
      fetchCategorias(); // Actualizar la lista de categorías después de la edición
    } else {
      alert('Hubo un problema al actualizar la categoría');
    }
  } catch (error) {
    console.error('Error updating categoria:', error);
    alert('Hubo un error al intentar actualizar la categoría');
  }
}


async function deleteCategoria(id) {
  try {
    const confirmacion = confirm('¿Estás seguro de eliminar esta categoría?');
    if (!confirmacion) {
      return; // Si el usuario cancela, salir de la función
    }

    // Verificar si hay cursos asociados
    const response = await fetch(`/cursos/categoria/${id}`);
    const cursos = await response.json();

    if (Array.isArray(cursos) && cursos.length > 0) {
      alert('No se puede eliminar la categoría porque tiene cursos asociados.');
      return; // Salir si hay cursos asociados
    }

    // Si no hay cursos asociados, proceder con la eliminación
    const deleteResponse = await fetch(`/categorias/${id}`, {
      method: 'DELETE'
    });

    if (deleteResponse.ok) {
      alert('Categoría eliminada correctamente');
      fetchCategorias(); // Actualizar la lista de categorías después de la eliminación
    } else {
      alert('Hubo un problema al intentar eliminar la categoría seleccionada');
    }
  } catch (error) {
    console.error('Error deleting categoria:', error);
    alert('Hubo un error al intentar eliminar la categoría');
  }
}











// Función para editar un curso
function editCurso(id) {
  // Lógica para editar el curso
  console.log(`Editar curso con ID: ${id}`);
}


//

async function deleteLeccion(id) {
  try {
    // Mostrar mensaje de confirmación antes de eliminar
    const confirmacion = confirm('¿Está seguro que desea eliminar esta leccion?');
    if (!confirmacion) {
      return; // Cancelar la eliminación si el usuario no confirma
    }

    const response = await fetch(`/lecciones/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la leccion');
    }

    // Eliminación exitosa, actualizar la tabla de cursos
    await fetchCursos(); // Llamar a fetchCursos() para actualizar la lista de cursos

    // Mostrar mensaje de éxito
    alert('Leccion eliminada exitosamente');

  } catch (error) {
    console.error('Error al eliminar la leccion:', error);
    // Manejar errores o mostrar un mensaje de error al usuario si es necesario
    alert('Ocurrió un error al eliminar la leccion. Por favor, inténtelo de nuevo más tarde.');
  }
}


// Función para obtener la lista de lecciones
async function fetchLecciones() {
  try {
      const response = await fetch('/lecciones');
      const lecciones = await response.json();

      const leccionList = document.getElementById('leccion-list');
      leccionList.innerHTML = '';

      lecciones.forEach(leccion => {
          const tr = document.createElement('tr');

          const tdId = document.createElement('td');
          tdId.textContent = leccion.id;
          tdId.setAttribute('data-label', 'ID');
          tr.appendChild(tdId);

          const tdTitle = document.createElement('td');
          tdTitle.textContent = leccion.title;
          tdTitle.setAttribute('data-label', 'Título');
          tr.appendChild(tdTitle);

          const tdDescription = document.createElement('td');
          tdDescription.textContent = leccion.description;
          tdDescription.setAttribute('data-label', 'Descripción');
          tr.appendChild(tdDescription);

          const tdTutor = document.createElement('td');
          tdTutor.textContent = leccion.tutor_name;
          tdTutor.setAttribute('data-label', 'Tutor');
          tr.appendChild(tdTutor);

          const tdCurso = document.createElement('td');
          tdCurso.textContent = leccion.curso_title;
          tdCurso.setAttribute('data-label', 'Tutor');
          tr.appendChild(tdCurso);

          const tdEdit = document.createElement('td');
          tdEdit.setAttribute('data-label', 'Editar');
          const editButton = document.createElement('button');
          editButton.textContent = 'Editar';
          editButton.className = 'edit';
          editButton.onclick = () => {
            window.location.href = `update_content.html?id=${leccion.id}`;
        };
          tdEdit.appendChild(editButton);
          tr.appendChild(tdEdit);

          const tdDelete = document.createElement('td');
          tdDelete.setAttribute('data-label', 'Eliminar');
          const deleteButton = document.createElement('button');
          deleteButton.textContent = 'Eliminar';
          deleteButton.className = 'delete';
          deleteButton.onclick = () => deleteLeccion(leccion.id);
          tdDelete.appendChild(deleteButton);
          tr.appendChild(tdDelete);

          leccionList.appendChild(tr);
      });
  } catch (error) {
      console.error('Error fetching lecciones:', error);
  }
}

// Llamar a la función para obtener la lista de lecciones cuando la página cargue
window.onload = () => {
  fetchUsers();
  fetchCursos();
  fetchLecciones(); // Agregado para obtener las lecciones al cargar la página
  fetchCategorias();
};