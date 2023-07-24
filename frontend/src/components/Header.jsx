import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header>
      <h1>
        <HighlightIcon />
        <Link to="/" style={{textDecoration:'none',color:'white'}}>Keeper</Link>
      </h1>
      <h2 style={{float:'right',marginTop:-40}}> <Link to="home" style={{textDecoration:'none',color:'white'}}>home</Link></h2>
    </header>
  );
}

export default Header;
