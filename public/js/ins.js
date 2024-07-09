document.querySelector('.save-playlist button').addEventListener('click', function (event) {
  event.preventDefault();

  const urlParams = new URLSearchParams(window.location.search);
  const cursoId = urlParams.get('id');
  const token = localStorage.getItem('jwtToken');

  if (!token) {
    alert('Necesitas iniciar sesión para inscribirte en un curso.');
    window.location.href = 'login.html';
    return;
  }

  // Decodificar el JWT para obtener el user_id
  const userId = parseJwt(token).user_id;

  // Verificar si el usuario ya está inscrito en el curso
  fetch('/inscripciones/verificar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ curso_id: cursoId })
  })
  .then(response => response.json())
  .then(data => {
    if (data.inscrito) {
      alert('Ya estás inscrito en este curso');
    } else {
      // Si no está inscrito, proceder a crear la inscripción
      crearInscripcion(token, userId, cursoId);
    }
  })
  .catch(error => {
    console.error('Error al verificar la inscripción:', error);
    alert('Hubo un problema al verificar la inscripción');
  });
});

function crearInscripcion(token, userId, cursoId) {
  fetch('/inscripciones', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ user_id: userId, curso_id: cursoId }) 
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      console.error('Error al crear inscripción:', data.error);
      alert('Hubo un problema al inscribirte en el curso');
    } else {
      alert('Inscripción creada correctamente');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Hubo un problema al realizar la solicitud');
  });
}

// Función para decodificar el JWT
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
