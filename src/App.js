import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Your custom styles

const NoteApp = () => {
  const [notes, setNotes] = useState([]);  // Store notes from the database
  const [newNote, setNewNote] = useState({ title: '', content: '' }); // For new note input

  // Fetch notes from the backend API on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/notes')
      .then(response => setNotes(response.data)) // Set the fetched notes to the state
      .catch(error => console.log('Error fetching notes:', error));
  }, []);

  // Add a new note
  const handleAddNote = () => {
    if (newNote.title && newNote.content) {
      axios.post('http://localhost:5000/notes', newNote)
        .then(response => {
          setNotes([...notes, response.data]); // Add the new note to the state
        })
        .catch(error => console.log('Error adding note:', error));

      setNewNote({ title: '', content: '' }); // Reset new note input fields
    }
  };

  // Delete a note
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/notes/${id}`)
      .then(() => setNotes(notes.filter(note => note.id !== id))) // Remove the note from the state
      .catch(error => console.log('Error deleting note:', error));
  };

  return (
    <div className="note-app">
      <h1>Notes</h1>
      <div className="new-note">
        <input 
          type="text" 
          placeholder="Title" 
          value={newNote.title} 
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea 
          placeholder="Content" 
          value={newNote.content} 
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>
      <div className="notes-list">
        {notes.map(note => (
          <div key={note.id} className="note">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <span>{new Date(note.created_at).toLocaleString()}</span>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteApp;