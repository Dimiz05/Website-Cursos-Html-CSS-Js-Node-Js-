// controladores/authController.js

const User = require('../modelos/users');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; 

exports.login = (req, res) => {
   const { email, pass } = req.body;

   User.getByEmail(email, (err, results) => {
      if (err) {
         console.error('Error al obtener usuario:', err);
         res.status(500).json({ error: 'Database error' });
      } else if (results.length === 0) {
         res.status(401).json({ error: 'User not found' });
      } else {
         const user = results[0];
         bcrypt.compare(pass, user.password, (err, isMatch) => {
            if (err) {
               console.error('Error al comparar contraseñas:', err);
               res.status(500).json({ error: 'Authentication error' });
            } else if (isMatch) {
               // Generar JWT
               const token = jwt.sign({ user_id: user.id, email: user.email, name: user.name }, secretKey, { expiresIn: '1h' });

               // Enviar el token JWT en la respuesta
               res.json({ message: 'Login successful', token });
            } else {
               console.log('Contraseña incorrecta para el usuario:', user.email);
               res.status(401).json({ error: 'Invalid password' });
            }
         });
      }
   });
};
