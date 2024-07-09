// models/tutorModel.js
const db = require('../db');
const bcrypt = require('bcryptjs');

const Tutor = {
  getAll: (callback) => {
    db.query(`
      SELECT tutors.id, tutors.name, COUNT(cursos.id) AS total_courses
      FROM tutors
      LEFT JOIN cursos ON cursos.tutor_id = tutors.id
      GROUP BY tutors.id
    `, callback);
  },
  getDetails: (id, callback) => {
    db.query(`
      SELECT tutors.name, COUNT(cursos.id) AS total_courses, cursos.id AS course_id, cursos.title, cursos.thumb
      FROM tutors
      LEFT JOIN cursos ON cursos.tutor_id = tutors.id
      WHERE tutors.id = ?
      GROUP BY cursos.id
    `, [id], callback);
  },
  create: (newTutor, callback) => {
    const { name, email, password } = newTutor;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return callback(err);
      }
      db.query('INSERT INTO tutors (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], callback);
    });
  }
};

module.exports = Tutor;
