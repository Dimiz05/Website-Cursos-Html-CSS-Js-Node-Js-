// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controladores/usersController');

// Ruta para actualizar perfil de usuario
router.post('/update-profile', userController.updateUserProfile);

// Rutas
router.get('/cursos', userController.getCursosUsuario);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
