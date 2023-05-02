import React from "react";
import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';

function UpdateNote() {
  const { id } = useParams();
  // const history = useHistory();
  const [note, setNote] = useState({
    title: '',
    content: ''
  });

  useEffect(()=>{
    axios.get('http://localhost:5000/notes/'+id)
    .then(response=>{
      setNote(response.data)
    })
    .catch(err=>console.log(err));
  },[])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:5000/notes/update/'+id, note);
    } catch (error) {
      console.log(error);
    }
    window.location="/"; 
  };

  return (
    <div>
      <h2 style={{margin:10}}>Update Note</h2>
      <form onSubmit={handleFormSubmit} className="create-note">
        <div>
          <label style={{fontSize:25,fontWeight:"bold"}} htmlFor="title">Title</label>
          <input 
            type="text"
            id="title"
            name="title"
            value={note.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label style={{fontSize:25,fontWeight:"bold"}} htmlFor="content">Content</label>
          <textarea style={{height:90}}
            id="text"
            name="content"
            value={note.content}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default UpdateNote;
