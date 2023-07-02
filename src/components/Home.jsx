
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Home() {
    const [notes, setNotes] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const navigate = useNavigate();
    useEffect(()=>{
      if (!cookies.jwt) {
        navigate("/");
      }
      axios.get('http://localhost:5000/notes',{
        withCredentials: true,
      })
      .then(response=>{
        setNotes(response.data)
      })
      .catch(err=>console.log(err));
    },[cookies])
  
    function addNote(newNote) {
      axios.post('http://localhost:5000/notes/add',newNote,{withCredentials:true})
      console.log(newNote);
      setNotes(prevNotes => {
        return [...prevNotes, newNote];
      });
    }
  
    function deleteNote(id) {
      
      axios.delete('http://localhost:5000/notes/delete/'+id,{withCredentials:true})
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
  
  export default Home;
  