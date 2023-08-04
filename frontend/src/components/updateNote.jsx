import React from "react";
import { useState, useEffect } from 'react';
import { useParams,useNavigate} from 'react-router-dom';

import axios from 'axios';
import {API_URL} from "./config";

function UpdateNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const history = useHistory();
  const [note, setNote] = useState({
    title: '',
    content: ''
  });

  useEffect(()=>{
    axios.get(API_URL+'/notes/'+id,{withCredentials:true})
    .then(response=>{
      setNote(response.data)
    })
    .catch(err=>console.log(err));
  },[navigate])

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
      const {data}=await axios.post(API_URL+'/notes/update/'+id, note,{withCredentials:true});
      if(data.status){
        navigate("/home");
      }
      
    } catch (error) {
      console.log(error);
    }
    
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
