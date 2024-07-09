document.addEventListener('DOMContentLoaded', function() {
   const updateForm = document.getElementById('updateForm');

   // Obtener datos del usuario desde localStorage
   const userName = localStorage.getItem('userName');
   const userEmail = localStorage.getItem('userEmail');

   // Llenar los campos de nombre y correo electrónico si están disponibles
   if (userName) {
      updateForm.elements['name'].value = userName;
   }
   if (userEmail) {
      updateForm.elements['email'].value = userEmail;
   }

   updateForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const formData = new FormData(updateForm);

      fetch('/update-profile', {
         method: 'POST',
         body: formData,
         headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
         }
      })
      .then(response => {
         if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
         }
         return response.json();
      })
      .then(data => {
         console.log('Perfil actualizado:', data);
         alert('Perfil actualizado correctamente.');
         // Aquí podrías redirigir a otra página o actualizar dinámicamente la interfaz
         window.location.href = '/profile.html'; // Ejemplo de redirección a la página de perfil
      })
      .catch(error => {
         console.error('Error:', error);
         alert('Hubo un problema al actualizar el perfil. Por favor intenta nuevamente.');
      });
   });
});
