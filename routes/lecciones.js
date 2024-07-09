// routes/leccionRoutes.js

const express = require('express');
const router = express.Router();
const leccionController = require('../controladores/leccionesController');
const multer = require('multer');
const path = require('path');

// Configuración de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage: storage });

// Rutas para las lecciones
router.get('/', leccionController.getAllLecciones);
router.post('/', upload.single('thumb'), leccionController.createLeccion);
router.get('/curso/:cursoId', leccionController.getAllLeccionesByCursoId);
router.get('/:id', leccionController.getLeccionById);
router.put('/:id', leccionController.updateLeccion);
router.delete('/:id', leccionController.deleteLeccion);


module.exports = router;
