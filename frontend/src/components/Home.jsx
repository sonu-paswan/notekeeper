
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
import { useCookies } from "react-cookie";
import {useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {API_URL} from "./config";

function Home() {
    const [notes, setNotes] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const navigate = useNavigate();
    useEffect(()=>{
      if (!cookies.jwt) {
        navigate("/");
      }
      axios.get(API_URL+'/notes',{
        withCredentials: true,
      })
      .then(response=>{
        setNotes(response.data)
      })
      .catch(err=>console.log(err));
    },[cookies])
  
    function addNote(newNote) {
      axios.post(API_URL+'/notes/add',newNote,{withCredentials:true})
      .then(response=>{
        console.log(response.data);
        setNotes(prevNotes => {
          return [...prevNotes, response.data];
        });
      })
    }
  
    function deleteNote(id) {
      
      axios.delete(API_URL+'/notes/delete/'+id,{withCredentials:true})
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
  