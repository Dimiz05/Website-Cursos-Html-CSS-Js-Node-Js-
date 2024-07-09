// js/misCursos.js
document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('jwtToken');

  if (token) {
    // Decodificar el JWT para obtener el user_id
  const userId = parseJwt(token).user_id;

    fetch(`/cursos/misCursos/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const cursosContainer = document.getElementById('coursesContainer');
        data.forEach(curso => {
          const cursoElement = document.createElement('div');
         cursoElement.classList.add('box');
         cursoElement.innerHTML = `
           <div class="thumb">
             <img src="${curso.thumb}" alt="">
           </div>
           <h3 class="title">${curso.title}</h3>
           <a href="./playlist.html?id=${curso.id}" class="inline-btn">Ver Curso</a>
         `;
         coursesContainer.appendChild(cursoElement);
        });
      })
      .catch(error => {
        console.error('Error fetching user courses:', error);
      });
  } else {
    window.location.href = '/login.html';
  }
});

// Función para decodificar el JWT
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}