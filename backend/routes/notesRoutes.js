const express = require('express');
const { getAllNotes, addNote, deleteNote } = require('../controller/notesController.js');

const router = express.Router();

router.get('/', getAllNotes);
router.post('/', addNote);
router.delete('/:id', deleteNote);

module.exports = router;
