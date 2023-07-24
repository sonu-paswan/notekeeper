import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./Start";
import Home from "./Home";
import UpdateNote from "./updateNote";
import Register from "./Register";
import Login from "./Login";
import React from "react";
import Header from "./Header";
function App() {
  return (
    <BrowserRouter> 
      <Header />
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<Home />} />
        <Route path="/update/:id" element={<UpdateNote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
