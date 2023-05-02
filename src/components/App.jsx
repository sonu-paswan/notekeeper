import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import UpdateNote from "./updateNote";
import React from "react";
import Header from "./Header";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update/:id" element={<UpdateNote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
