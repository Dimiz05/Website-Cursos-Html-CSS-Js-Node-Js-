// controladores/inscripcionesController.js

const Inscripcion = require('../modelos/inscripciones');

exports.createInscripcion = (req, res) => {
  const userId = req.userId;
  const { cursoId } = req.body;

  if (!userId || !cursoId) {
    return res.status(400).json({ error: 'Se requieren ID de usuario y ID de curso' });
  }

  const inscripcionData = { user_id: userId, curso_id: cursoId };

  Inscripcion.create(inscripcionData, (err) => {
    if (err) {
      console.error('Error al crear inscripción:', err);
      res.status(500).json({ error: 'Error en la base de datos' });
    } else {
      res.status(201).json({ message: 'Inscripción creada correctamente' });
    }
  });
};

const inscripcionesController = {};

inscripcionesController.getFuncionEspecifica = (req, res) => {
  // Lógica para manejar la solicitud GET
  res.send('Función específica para GET');
};

module.exports = inscripcionesController;