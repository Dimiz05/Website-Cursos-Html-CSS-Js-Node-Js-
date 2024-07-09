// ruotes/inscripciones.js
const express = require('express');
const router = express.Router();
const Inscripcion = require('../modelos/inscripciones');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Endpoint para crear inscripción
router.post('/', (req, res) => {
  const { user_id, curso_id } = req.body;

  if (!user_id || !curso_id) {
    return res.status(400).json({ error: 'user_id y curso_id son necesarios' });
  }

  Inscripcion.create({ user_id, curso_id }, (err, result) => {
    if (err) {
      console.error('Error al crear inscripción:', err);
      return res.status(500).json({ error: 'Error al crear inscripción' });
    }
    res.status(201).json({ message: 'Inscripción creada correctamente' });
  });
});

router.post('/verificar', (req, res) => {
  try {
    // Obtener y verificar el token JWT del encabezado Authorization
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'your_secret_key');
    
    // Extraer el user_id del token decodificado
    const userId = decoded.user_id;

    // Obtener curso_id del cuerpo de la solicitud
    const { curso_id } = req.body;

    // Consultar la base de datos para verificar la inscripción
    const query = 'SELECT * FROM inscripciones WHERE user_id = ? AND curso_id = ?';
    db.query(query, [userId, curso_id], (err, results) => {
      if (err) {
        console.error('Error al verificar la inscripción:', err);
        return res.status(500).json({ error: 'Error verificando la inscripción' });
      }
      if (results.length > 0) {
        res.json({ inscrito: true });
      } else {
        res.json({ inscrito: false });
      }
    });
  } catch (err) {
    console.error('Error al decodificar el token:', err);
    res.status(400).json({ error: 'Token inválido o no proporcionado' });
  }
});


module.exports = router;
