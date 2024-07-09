// public/js/auth.js

function showProfile() {
   var token = getJwtToken();

   if (token) {
      // Decodificar el token para obtener los datos del usuario si es necesario
      var userData = parseJwt(token);

      // Mostrar perfil con los datos del usuario
      document.querySelector('.profile').innerHTML = `
         <img src="images/avatar.png" class="image" alt="">
         <h3 class="name" id="userName">${userData.name}</h3>
         <p class="role">Estudiante</p>
         <a href="profile.html" class="btn">Perfil</a>
         <div class="flex-btn">
            <a href="#" onclick="logout()" class="option-btn">Cerrar Sesión</a>
         </div>
      `;

      // Actualizar el nombre del usuario en la página de perfil
      document.querySelector('.user h3').textContent = userData.name;
   } else {
      // Mostrar opciones de inicio de sesión y registro
      document.querySelector('.profile').innerHTML = `
         <div class="flex-btn">
            <a href="login.html" class="option-btn">Iniciar Sesión</a>
            <a href="register.html" class="option-btn">Crear Cuenta</a>
         </div>
      `;
   }
}

function getJwtToken() {
   return localStorage.getItem('jwtToken');
}

function logout() {
   // Eliminar el token JWT al cerrar sesión
   localStorage.removeItem('jwtToken');
   // Redirigir a la página de inicio de sesión
   window.location.href = "./login.html";
}

function parseJwt(token) {
   // Decodificar el token JWT para obtener los datos del usuario
   const base64Url = token.split('.')[1];
   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
   const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
   }).join(''));

   return JSON.parse(jsonPayload);
}

// Mostrar el perfil al cargar la página
showProfile();
