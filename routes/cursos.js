// routes/cursos.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const cursoController = require('../controladores/cursosController');

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

// Rutas
router.post('/', upload.single('thumb'), cursoController.createCurso);
router.get('/categoria/:categoriaId', cursoController.getCursosByCategoriaId);
router.get('/categoria', cursoController.getCursosByCategoria);
router.get('/tutor', cursoController.getCursosByTutorId);
router.get('/', cursoController.getAllCursos);
router.get('/:id', cursoController.getCursoDetails);
router.put('/:id', cursoController.updateCurso);
router.delete('/:id', cursoController.deleteCurso);

router.get('/misCursos/:userId', cursoController.getUserCourses);

module.exports = router;
