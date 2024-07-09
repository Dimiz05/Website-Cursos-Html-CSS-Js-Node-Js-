// models/leccionModel.js

const db = require('../db');

const Leccion = {
  create: (leccionData, callback) => {
    db.query(
      'INSERT INTO lecciones (tutor_id, curso_id, title, description, video, thumb) VALUES (?, ?, ?, ?, ?, ?)',
      [
        leccionData.tutor_id,
        leccionData.curso_id,
        leccionData.title,
        leccionData.description,
        leccionData.video,
        leccionData.thumb
      ],
      callback
    );
  },

  getByCursoId: (cursoId, callback) => {
    db.query('SELECT * FROM lecciones WHERE curso_id = ?', [cursoId], callback);
  },

  getAllByCursoId: (cursoId, callback) => {
    db.query(
      'SELECT * FROM lecciones WHERE curso_id = ?',
      [cursoId],
      callback
    );
  },

  getById: (id, callback) => {
    db.query(
      'SELECT * FROM lecciones WHERE id = ?',
      [id],
      callback
    );
  },

  update: (id, leccionData, callback) => {
    db.query(
      'UPDATE lecciones SET title = ?, description = ?, video = ? WHERE id = ?',
      [
        leccionData.title,
        leccionData.description,
        leccionData.video,
        id
      ],
      callback
    );
  },

  delete: (id, callback) => {
    db.query(
      'DELETE FROM lecciones WHERE id = ?',
      [id],
      callback
    );
  },

  getAll: (callback) => {
    const querry = `
      SELECT l.id, l.title, l.description, l.video, l.thumb,
             c.title AS curso_title, 
             t.name AS tutor_name
      FROM lecciones l
      INNER JOIN cursos c ON l.curso_id = c.id
      INNER JOIN tutors t ON l.tutor_id = t.id`;
    db.query(querry, callback);
  }
};

module.exports = Leccion;
