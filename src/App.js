import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const NoteApp = () => {
  const [notes, setNotes] = useState([]);  
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  
  useEffect(() => {
    axios.get('http://localhost:5000/notes')
      .then(response => setNotes(response.data))
      .catch(error => console.log('Error fetching notes:', error));
  }, []);

  const handleAddNote = () => {
    if (newNote.title && newNote.content) {
      axios.post('http://localhost:5000/notes', newNote)
        .then(response => {
          setNotes([...notes, response.data]);
        })
        .catch(error => console.log('Error adding note:', error));

      setNewNote({ title: '', content: '' });
    }
  };

  const handleDelete = (Id) => {
    axios.delete(`http://localhost:5000/notes/${Id}`)
      .then(() => setNotes(notes.filter(note => note.Id !== Id)))
      .catch(error => console.log('Error deleting note:', error));
  };

  // Auto-resize textarea function
  const handleTextareaResize = (e) => {
    e.target.style.height = 'auto'; // Reset height
    e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height based on scrollHeight
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
          onChange={(e) => {
            setNewNote({ ...newNote, content: e.target.value });
            handleTextareaResize(e); // Adjust the height dynamically
          }}
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>
      <div className="notes-list">
        {notes.map(note => (
          <div key={note.Id} className="note">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <span>{new Date(note.created_at).toLocaleString()}</span>
            <button onClick={() => handleDelete(note.Id)}> <FontAwesomeIcon icon={faTrash} style={{ color: 'black' }}/></button>
          </div>
        ))}
      </div>
    </div>
  );
};


export default NoteApp;
