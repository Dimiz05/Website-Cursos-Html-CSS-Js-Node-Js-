// controllers/categoriaController.js
const Categoria = require('../modelos/categorias');
const Curso = require('../modelos/cursos');

exports.getAllCategorias = (req, res) => {
  Categoria.getAll((err, results) => {
    if (err) {
      console.error('Error fetching categorias:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
};

exports.getCategoriaById = (req, res) => {
  const categoriaId = req.params.id;
  Categoria.getById(categoriaId, (err, results) => {
    if (err) {
      console.error('Error fetching categoria:', err);
      res.status(500).json({ error: 'Database error' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Categoría no encontrada' });
    } else {
      res.json(results[0]);
    }
  });
};

// Crear una nueva categoría
exports.createCategoria = (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre de la categoría es requerido' });
  }

  Categoria.create(nombre, (err, result) => {
    if (err) {
      console.error('Error creating categoria:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.status(201).json({ message: 'Categoría creada correctamente', id: result.insertId });
    }
  });
};

// Actualizar una categoría por ID
exports.updateCategoria = (req, res) => {
  const categoriaId = req.params.id;
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre de la categoría es requerido' });
  }

  Categoria.updateById(categoriaId, nombre, (err, results) => {
    if (err) {
      console.error('Error updating categoria:', err);
      res.status(500).json({ error: 'Database error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Categoría no encontrada' });
    } else {
      res.json({ message: 'Categoría actualizada correctamente' });
    }
  });
};


exports.deleteCategoria = async (req, res) => {
  const categoriaId = req.params.id;

  try {
    // Verificar si la categoría existe
    Categoria.findById(categoriaId, (err, categoria) => {
      if (err) {
        console.error('Error finding categoria:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      if (!categoria) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }

      // Verificar si existen cursos asociados a la categoría (si es necesario)

      // Eliminar la categoría
      Categoria.deleteById(categoriaId, (err, result) => {
        if (err) {
          console.error('Error deleting categoria:', err);
          return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json({ message: 'Categoría eliminada correctamente' });
      });
    });
  } catch (error) {
    console.error('Error deleting categoria:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
