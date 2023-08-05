import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import About from "./components/About";
import Home from "./components/Home";
import LiveMap from "./components/LiveMap";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<h3>page is in production </h3>} />
        <Route path="/home" element={<Home />} />
        <Route path="/live_map" element={<LiveMap />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
