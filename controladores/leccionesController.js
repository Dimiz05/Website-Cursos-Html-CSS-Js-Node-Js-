// controllers/leccionController.js

const Leccion = require('../modelos/lecciones');

exports.getAllLecciones = (req, res) => {
  Leccion.getAll((err, results) => {
    if (err) {
      console.error('Error fetching all lecciones:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      // Mapeamos los resultados para enviar solo los campos necesarios
      const lecciones = results.map(leccion => ({
        id: leccion.id,
        title: leccion.title,
        description: leccion.description,
        video: leccion.video,
        thumb: leccion.thumb,
        curso_title: leccion.curso_title,
        tutor_name: leccion.tutor_name
      }));

      res.json(lecciones);
    }
  });
};

exports.createLeccion = (req, res) => {
  const leccionData = req.body;
  leccionData.thumb = req.file ? `/uploads/${req.file.filename}` : ''; // Ruta del archivo cargado

  Leccion.create(leccionData, (err, result) => {
    if (err) {
      console.error('Error creating leccion:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(201).json({ message: 'Leccion created successfully', id: result.insertId });
    }
  });
};

exports.getAllLeccionesByCursoId = (req, res) => {
  const cursoId = req.params.cursoId;
  Leccion.getAllByCursoId(cursoId, (err, results) => {
    if (err) {
      console.error('Error fetching lecciones by curso id:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
};

exports.getLeccionById = (req, res) => {
  const id = req.params.id;
  Leccion.getById(id, (err, result) => {
    if (err) {
      console.error('Error fetching leccion by id:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      if (result.length === 0) {
        res.status(404).json({ error: 'Leccion not found' });
      } else {
        res.json(result[0]);
      }
    }
  });
};

exports.updateLeccion = (req, res) => {
  const id = req.params.id;
  const { title, description, video } = req.body; // Asegúrate de que estos campos coincidan con los nombres en el formulario

  // Verifica que al menos uno de los campos a actualizar esté presente en la solicitud
  if (!title && !description && !video) {
    return res.status(400).json({ error: 'Al menos uno de los campos (title, description, video) debe ser proporcionado para actualizar.' });
  }

  const leccionData = {
    title,
    description,
    video
  };

  Leccion.update(id, leccionData, (err, result) => {
    if (err) {
      console.error('Error updating lección:', err);
      res.status(500).json({ error: 'Error interno del servidor al actualizar la lección.' });
    } else {
      res.json({ message: 'Lección actualizada exitosamente.' });
    }
  });
};

exports.deleteLeccion = (req, res) => {
  const id = req.params.id;
  Leccion.delete(id, (err, result) => {
    if (err) {
      console.error('Error deleting leccion:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json({ message: 'Leccion deleted successfully' });
    }
  });
};

