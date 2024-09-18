const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create connection to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'NotesApp' 
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Get all notes (READ operation)
app.get('/notes', (req, res) => {
  const sql = 'SELECT * FROM notes ORDER BY created_at DESC'; 
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result); // Send the fetched notes as a JSON response
  });
});

// Add new note (CREATE operation)
app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  const sql = 'INSERT INTO notes (title, content) VALUES (?, ?)';
  db.query(sql, [title, content], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, title, content, created_at: new Date() });
  });
});

// Delete a note (DELETE operation)
app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  console.log(id)
  const sql = 'DELETE FROM notes WHERE Id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});