// controllers/tutorController.js
const Tutor = require('../modelos/tutors');

exports.getAllTutors = (req, res) => {
  Tutor.getAll((err, results) => {
    if (err) {
      console.error('Error fetching tutors:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
};

exports.getTutorDetails = (req, res) => {
  const tutorId = req.params.id;
  Tutor.getDetails(tutorId, (err, results) => {
    if (err) {
      console.error('Error fetching tutor details:', err);
      res.status(500).json({ error: 'Database error' });
    } else {
      res.json(results);
    }
  });
};

exports.createTutor = (req, res) => {
  const newTutor = req.body;
  Tutor.create(newTutor, (err, results) => {
    if (err) {
      console.error('Error inserting user:', err);
      res.status(500).json({ error: 'Database error', details: err.message });
    } else {
      res.status(201).json({ id: results.insertId });
    }
  });
};
