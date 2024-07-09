// modelos/cursos.js
const db = require('../db');

const Curso = {
  create: (newCurso, callback) => {
    const query = 'INSERT INTO cursos (tutor_id, title, description, categoria_id, thumb) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [newCurso.tutor_id, newCurso.title, newCurso.description, newCurso.categoria_id, newCurso.thumb], callback);
  },

  getByCategoria: (categoria, callback) => {
    const query = `
       SELECT cursos.*, tutors.name as tutor_name
       FROM cursos
       JOIN tutors ON cursos.tutor_id = tutors.id
       WHERE cursos.categoria_id = ?
    `;
    db.query(query, [categoria], callback);
 },

 getByCategoriaId: (categoriaId, callback) => {
  db.query('SELECT * FROM cursos WHERE categoria_id = ?', [categoriaId], callback);
},

getByTutorId: (tutorId, callback) => {
  db.query('SELECT * FROM cursos WHERE tutor_id = ?', [tutorId], callback);
},

 delete: (id, callback) => {
  db.query(
    'DELETE FROM cursos WHERE id = ?',
    [id],
    callback
  );
},
  
  getAll: (callback) => {
    const query = `
      SELECT cursos.*, tutors.name as tutor_name, categorias.nombre as categoria_name
      FROM cursos
      JOIN tutors ON cursos.tutor_id = tutors.id
      JOIN categorias ON cursos.categoria_id = categorias.id;
    `;
    db.query(query, callback);
  },
  getDetails: (id, callback) => {
    db.query(`
      SELECT cursos.id, cursos.title, cursos.description, cursos.thumb, tutors.name AS tutor_name, tutors.id AS tutor_id
      FROM cursos
      JOIN tutors ON cursos.tutor_id = tutors.id
      WHERE cursos.id = ?
    `, [id], (err, courseResults) => {
      if (err) {
        return callback(err);
      }
      if (courseResults.length === 0) {
        return callback(new Error('Curso no encontrado'));
      }

      const course = courseResults[0];
      db.query(`
        SELECT id, title, thumb
        FROM lecciones
        WHERE curso_id = ?
      `, [id], (err, lessonsResults) => {
        if (err) {
          return callback(err);
        }
        course.lessons = lessonsResults;
        callback(null, course);
      });
    });
  },

  update: (id, title, description, categoria_id, callback) => {
    const query = 'UPDATE cursos SET title = ?, description = ?, categoria_id = ? WHERE id = ?';
    db.query(query, [title, description, categoria_id, id], callback);
  },
  getUserCourses: (userId, callback) => {
    const query = `
      SELECT cursos.*, tutors.name AS tutor_name
      FROM inscripciones
      JOIN cursos ON inscripciones.curso_id = cursos.id
      JOIN tutors ON cursos.tutor_id = tutors.id
      WHERE inscripciones.user_id = ?
    `;
    db.query(query, [userId], callback);
  }
};

module.exports = Curso;
