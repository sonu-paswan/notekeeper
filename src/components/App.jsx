import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/notes')
    .then(response=>{
      setNotes(response.data)
    })
    .catch(err=>console.log(err));
  },[])

  function addNote(newNote) {
    axios.post('http://localhost:5000/notes/add',newNote)
    console.log(newNote);
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    
    axios.delete('http://localhost:5000/notes/delete/'+id)
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err));

    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return noteItem._id !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />     {/* use to add create and add note in app */}
      {notes.map((noteItem, index) => {  {/* use to display and delete note */}
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
