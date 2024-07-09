// index.js

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const usersRouter = require('./routes/users');
const cursosRouter = require('./routes/cursos');
const tutorsRouter = require('./routes/tutors');
const categoriasRouter = require('./routes/categorias');
const authRouter = require('./routes/auth');
const leccionesRouter = require('./routes/lecciones');
const inscripcionRouter = require('./routes/inscripciones');

// Configurar la carpeta pública para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(cors()); // Para manejar solicitudes JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para manejar datos de formularios tradicionales

// Usar rutas
app.use('/users', usersRouter);
app.use('/cursos', cursosRouter);
app.use('/tutors', tutorsRouter);
app.use('/categorias', categoriasRouter);
app.use('/auth', authRouter);
app.use('/lecciones', leccionesRouter);
app.use('/inscripciones', inscripcionRouter);

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
