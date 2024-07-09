document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cursoId = urlParams.get('id');
    const token = localStorage.getItem('jwtToken');
  
    if (!cursoId) {
      alert('No se proporcionó un ID de curso');
      return;
    }
  
    
  
    fetch(`http://localhost:3000/cursos/${cursoId}`)
      .then(response => response.json())
      .then(data => {
        if (data.curso && data.lecciones) {
          document.getElementById('cursoThumb').src = data.curso.thumb || 'images/default-thumb.png';
          document.getElementById('tutorName').innerText = data.curso.tutor_name || 'Nombre del Tutor';
          document.getElementById('tutorProfileLink').href = `teacher_profile.html?id=${data.curso.tutor_id}`;
          document.getElementById('cursoTitle').innerText = data.curso.title || 'Título del Curso';
          document.getElementById('cursoDescription').innerText = data.curso.description || 'Descripción del Curso';
  
          const leccionesContainer = document.getElementById('lessonsContainer');
          leccionesContainer.innerHTML = ''; // Limpiar el contenedor
  
          if (data.lecciones.length > 0) {
            data.lecciones.forEach(leccion => {
              const leccionElement = document.createElement('a');
              leccionElement.classList.add('box');
              leccionElement.href = `#`;
              leccionElement.dataset.leccionId = leccion.id;
              leccionElement.innerHTML = `
                <i class="fas fa-play"></i>
                <img src="${leccion.thumb || 'images/default-thumb.png'}" alt="">
                <h3>${leccion.title}</h3>
              `;
              leccionesContainer.appendChild(leccionElement);
            });
            addLessonEventListeners(); 
          } else {
            leccionesContainer.innerHTML = '<p>No se encontraron lecciones para este curso.</p>';
          }
        } else {
          alert('No se encontraron detalles para el curso');
        }
      })
      .catch(error => {
        console.error('Error fetching curso details:', error);
        alert('Hubo un problema al cargar los detalles del curso');
      });
  });
  
  function addLessonEventListeners() {
 const token = localStorage.getItem('jwtToken');
 
 const lecciones = document.querySelectorAll('.box');
 lecciones.forEach(leccion => {
   leccion.addEventListener('click', (event) => {
     event.preventDefault();
     const urlParams = new URLSearchParams(window.location.search);
     const cursoId = urlParams.get('id');
     // Decodificar el JWT para obtener el user_id
     const userId = parseJwt(token).user_id;
     const leccionId = leccion.dataset.leccionId;

     fetch(`http://localhost:3000/inscripciones/verificar`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`
       },
       body: JSON.stringify({ user_id: userId, curso_id: cursoId })
     })
     .then(response => response.json())
     .then(data => {
       console.log(data); 
       if (data.inscrito) {
         window.location.href = `watch-video.html?id=${leccionId}`; 
       } else {
         alert('Debes estar inscrito en el curso para ver esta lección.');
       }
     })
     .catch(error => {
       console.error('Error verificando la inscripción:', error);
       alert('Hubo un problema al verificar la inscripción');
     });
   });
 });
}