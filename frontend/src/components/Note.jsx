import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from '@material-ui/icons/Update';
import {Link} from 'react-router-dom';
function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
    console.log(props.id);
  }
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
      <Link style={{position:"relative",float:"right",margin:5}} to={"/update/"+props.id}><UpdateIcon/></Link>
    </div>
  );
}

export default Note;
