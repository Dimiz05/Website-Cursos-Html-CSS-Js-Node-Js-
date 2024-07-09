// controladores/usersController.js
const User = require('../modelos/users');
const bcrypt = require('bcryptjs');

exports.getCursosUsuario = (req, res) => {
  const userId = req.user.id; // Obtener el ID del usuario autenticado desde el token o sesión

  User.getCursos(userId, (err, cursos) => {
    if (err) {
      console.error('Error fetching user courses:', err);
      return res.status(500).json({ error: 'Error al obtener cursos del usuario' });
    }
    res.json(cursos);
  });
};

exports.updateUserProfile = (req, res) => {
  const userId = req.user.id; // Obtener el ID del usuario autenticado desde la sesión/token
  const updatedUserData = {
    name: req.body.name,
    email: req.body.email,
    newPassword: req.body.new_pass, // Nueva contraseña (si se proporciona)
  };

  // Llamar al método de modelo para actualizar el usuario
  User.update(userId, updatedUserData, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al actualizar perfil' });
    } else {
      res.status(200).json({ message: 'Perfil actualizado correctamente' });
    }
  });
};

exports.getAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
};

exports.getUserById = (req, res) => {
  const userId = req.params.id;
  User.getById(userId, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results[0]);
    }
  });
};

exports.createUser = (req, res) => {
  const newUser = req.body;

  User.getByEmail(newUser.email, (err, results) => {
    if (err) {
      console.error('Error checking email:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0) {
      return res.status(409).json({ error: 'Email ya en uso' });
    }

    User.create(newUser, (err, results) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      res.status(201).json({ id: results.insertId });
    });
  });
};


exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  User.update(userId, updatedUser, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(204).end();
    }
  });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  User.delete(userId, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(204).end();
    }
  });
};
