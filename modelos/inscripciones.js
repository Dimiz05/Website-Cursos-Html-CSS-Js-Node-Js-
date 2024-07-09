// modelos/inscripciones.js
const db = require('../db');
const Inscripcion = {};

Inscripcion.create = (data, callback) => {
  const query = 'INSERT INTO inscripciones (user_id, curso_id) VALUES (?, ?)';
  db.query(query, [data.user_id, data.curso_id], callback);
};



module.exports = Inscripcion;
