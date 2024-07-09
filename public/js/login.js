document.getElementById('loginForm').addEventListener('submit', function (event) {
   event.preventDefault();

   // Obtener los valores de los campos de entrada
   var email = document.getElementById('email').value;
   var password = document.getElementById('pass').value;
   var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

   // Obtener los elementos de error
   var emailError = document.getElementById('emailError');
   var passwordError = document.getElementById('passwordError');
   var genericError1 = document.getElementById('genericError1');
   var genericError2 = document.getElementById('genericError2');

   // Restablecer los mensajes de error
   emailError.textContent = '';
   passwordError.textContent = '';
   genericError1.textContent = '';
   genericError2.textContent = '';

   // Validar el correo electrónico
   var isValid = true;

   if (!email) {
      emailError.textContent = 'Por favor, ingresa tu correo electrónico.';
      isValid = false;
   } else if (!emailPattern.test(email)) {
      emailError.textContent = 'Por favor, ingresa un correo electrónico válido.';
      isValid = false;
   }

   // Validar la contraseña
   if (!password) {
      passwordError.textContent = 'Por favor, ingresa tu contraseña.';
      isValid = false;
   } else if (password.length < 6) {
      passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres.';
      isValid = false;
   }

   if (isValid) {
      fetch('/auth/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ email: email, pass: password })
      })
         .then(response => response.json())
         .then(data => {
            if (data.error) {
               // Manejar errores de autenticación de manera genérica
               genericError1.textContent = 'Correo electrónico o contraseña incorrectos.';
               genericError2.textContent = 'Correo electrónico o contraseña incorrectos.';
            } else {
               // Almacenar el JWT en localStorage o cookies
               localStorage.setItem('jwtToken', data.token);

               // Decodificar el JWT para obtener el ID del usuario
               const payload = parseJwt(data.token);
               const userEmail = payload.email; // Asegúrate de que el campo ID esté presente en el JWT

               // Redirigir según el correo electrónico del usuario
               if (userEmail === 'admin3@gmail.com') {
                  window.location.href = "../admin/dashboard.html";
               } else {
                  window.location.href = "./home.html";
               }
            }
         })
         .catch(error => {
            console.error('Error:', error);
         });
   }
});

// Función para decodificar el JWT
function parseJwt(token) {
   const base64Url = token.split('.')[1];
   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
   const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
   }).join(''));

   return JSON.parse(jsonPayload);
}
