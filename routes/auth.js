// routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controladores/authController');

// Ruta para la autenticación
router.post('/login', authController.login);

module.exports = router;
