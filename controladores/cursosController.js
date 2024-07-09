// controladores/cursoController.js
const db = require('../db');
const Curso = require('../modelos/cursos');
const Leccion = require('../modelos/lecciones');

// Obtener cursos por categoría
exports.getCursosByCategoriaId = (req, res) => {
  const categoriaId = req.params.categoriaId;

  Curso.getByCategoriaId(categoriaId, (err, cursos) => {
    if (err) {
      console.error('Error fetching cursos by categoria:', err);
      res.status(500).json({ error: 'Error al obtener cursos por categoría' });
    } else {
      res.json(cursos);
    }
  });
};


exports.getCursosByCategoria = (req, res) => {
  const categoria = req.query.categoria;

  if (!categoria) {
     return res.status(400).json({ error: 'Falta el parámetro de categoría' });
  }

  Curso.getByCategoria(categoria, (err, cursos) => {
     if (err) {
        console.error('Error fetching cursos:', err);
        res.status(500).json({ error: 'Error al obtener cursos' });
     } else {
        res.json(cursos);
     }
  });
};

exports.getCursosByTutorId = (req, res) => {
  const tutorId = req.query.tutorId;

  if (!tutorId) {
    return res.status(400).json({ error: 'Falta el parámetro tutorId' });
  }

  Curso.getByTutorId(tutorId, (err, cursos) => {
    if (err) {
      console.error('Error fetching cursos by tutor:', err);
      res.status(500).json({ error: 'Error al obtener cursos por tutor' });
    } else {
      res.json(cursos);
    }
  });
};

exports.getCourseDetails = (req, res) => {
  const courseId = req.params.id;
  Curso.getDetails(courseId, (err, course) => {
    if (err) {
      console.error('Error fetching course details:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json({ curso: course, lecciones: course.lessons });
    }
  });
};

exports.getCursoDetails = (req, res) => {
  const cursoId = req.params.id;

  // Obtener los detalles del curso
  Curso.getDetails(cursoId, (err, curso) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    // Obtener las lecciones del curso
    Leccion.getByCursoId(cursoId, (err, lecciones) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      // Responder con los detalles del curso y las lecciones
      res.json({ curso, lecciones });
    });
  });
};

exports.createCurso = (req, res) => {
  const newCurso = req.body;
  newCurso.thumb = req.file ? `/uploads/${req.file.filename}` : '';

  if (!newCurso.tutor_id || !newCurso.title || !newCurso.description || !newCurso.categoria_id || !newCurso.thumb) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  Curso.create(newCurso, (err, results) => {
    if (err) {
      console.error('Error inserting curso:', err);
      res.status(500).json({ error: 'Database error', details: err.message });
    } else {
      res.status(201).json({ id: results.insertId });
    }
  });
};

exports.getAllCursos = (req, res) => {
  Curso.getAll((err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
};

exports.updateCurso = (req, res) => {
  const { id } = req.params;
  const { title, description, categoria_id } = req.body;

  Curso.update(id, title, description, categoria_id, (err, result) => {
    if (err) {
      console.error('Error updating curso:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json({ message: 'Curso updated successfully' });
    }
  });
};

exports.deleteCurso = (req, res) => {
  const id = req.params.id;
  Curso.delete(id, (err, result) => {
    if (err) {
      console.error('Error deleting leccion:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json({ message: 'Leccion deleted successfully' });
    }
  });
};

exports.getUserCourses = (req, res) => {
  const userId = req.params.userId;

  Curso.getUserCourses(userId, (err, cursos) => {
    if (err) {
      console.error('Error fetching user courses:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(cursos);
    }
  });
};