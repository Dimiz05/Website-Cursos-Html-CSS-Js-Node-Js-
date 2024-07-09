document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita el envío predeterminado del formulario
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('pass').value;
    var confirmPassword = document.getElementById('c_pass').value;
    var nameError = document.getElementById('nameError');
    var emailError = document.getElementById('emailError');
    var passError = document.getElementById('passError');
    var cPassError = document.getElementById('cPassError');
    nameError.textContent = '';
    emailError.textContent = '';
    passError.textContent = '';
    cPassError.textContent = '';
    if (!name) {
        nameError.textContent = 'Por favor, ingresa tu nombre.';
    }
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
        emailError.textContent = 'Por favor, ingresa tu correo electrónico.';
    } else if (!emailPattern.test(email)) {
        emailError.textContent = 'Por favor, ingresa un correo electrónico válido.';
    }
    if (!password) {
        passError.textContent = 'Por favor, ingresa tu contraseña.';
    } else if (password.length < 6) {
        passError.textContent = 'La contraseña debe tener al menos 6 caracteres.';
    }
    if (!confirmPassword) {
        cPassError.textContent = 'Por favor, confirma tu contraseña.';
    } else if (confirmPassword !== password) {
        cPassError.textContent = 'Las contraseñas no coinciden.';
    }
    if (name && email && emailPattern.test(email) && password && password.length >= 6 && confirmPassword && confirmPassword === password) {
        try {
            var response = await fetch('/tutors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: name, email: email, password: password })
            });
            if (response.ok) {
                window.location.href = "./dashboard.html";
            } else {
                var errorData = await response.json();
                alert('Error: ' + errorData.error);
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }
});