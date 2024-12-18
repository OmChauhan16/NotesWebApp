const db = require('../config/db');

const getAllNotes = (req, res) => {
  const sql = 'SELECT * FROM notes ORDER BY created_at DESC';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

const addNote = (req, res) => {
  const { title, content } = req.body;
  const sql = 'INSERT INTO notes (title, content) VALUES (?, ?)';
  db.query(sql, [title, content], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, title, content, created_at: new Date() });
  });
};

const deleteNote = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM notes WHERE Id = ?';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.sendStatus(200);
  });
};

module.exports = { getAllNotes, addNote, deleteNote };
