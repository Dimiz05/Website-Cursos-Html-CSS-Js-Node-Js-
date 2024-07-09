// routes/tutorRoutes.js
const express = require('express');
const router = express.Router();
const tutorController = require('../controladores/tutorsController');

// Rutas
router.get('/', tutorController.getAllTutors);
router.get('/:id', tutorController.getTutorDetails);
router.post('/', tutorController.createTutor);

module.exports = router;
