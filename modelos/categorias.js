// models/categoriaModel.js
const db = require('../db');

const Categoria = {
  getAll: (callback) => {
    db.query('SELECT * FROM categorias', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT nombre FROM categorias WHERE id = ?', [id], callback);
  },
  create: (nombre, callback) => {
    db.query('INSERT INTO categorias (nombre) VALUES (?)', [nombre], callback);
  },
  updateById: (id, nombre, callback) => {
    db.query('UPDATE categorias SET nombre = ? WHERE id = ?', [nombre, id], callback);
  },
  findById: (id, callback) => {
    db.query('SELECT * FROM categorias WHERE id = ?', [id], (err, results) => {
      if (err) {
        return callback(err, null); // Pasar el error al callback
      }
      if (results.length === 0) {
        return callback(null, null); // No se encontró ninguna categoría con ese ID
      }
      callback(null, results[0]); // Pasar el resultado al callback
    });
  },

  deleteById: (id, callback) => {
    db.query('DELETE FROM categorias WHERE id = ?', [id], (err, result) => {
      if (err) {
        return callback(err); // Pasar el error al callback
      }
      callback(null, result); // Pasar el resultado de la eliminación al callback
    });
  }
};

module.exports = Categoria;
