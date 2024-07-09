// modelos/users.js
const bcrypt = require('bcryptjs');
const db = require('../db');

const User = {
  getCursos: (userId, callback) => {
    const query = `
      SELECT cursos.*
      FROM cursos
      JOIN inscripciones ON cursos.id = inscripciones.curso_id
      WHERE inscripciones.user_id = ?
    `;
    db.query(query, [userId], callback);
  },
  getAll: (callback) => {
    db.query('SELECT * FROM users', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], callback);
  },

  getByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  },

  create: (newUser, callback) => {
    const { name, email, password } = newUser;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return callback(err);
      }
      db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], callback);
    });
  },

  update: (id, updatedUserData, callback) => {
    const { name, email, newPassword } = updatedUserData;

    if (newPassword) {
      // Si se proporciona una nueva contraseña, cifrarla antes de actualizar
      bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) {
          console.error('Error hashing password:', err);
          return callback(err);
        }
        db.query('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, hashedPassword, id], callback);
      });
    } else {
      // Si no hay nueva contraseña, solo actualizar nombre y correo electrónico
      db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], callback);
    }
  },

  delete: (id, callback) => {
    db.query('DELETE FROM users WHERE id = ?', [id], callback);
  }
};

module.exports = User;
