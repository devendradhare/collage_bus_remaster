// hooks imoprts
import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components imports
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import About from "./components/About";
import Home from "./components/Home";
import LiveMap from "./components/LiveMap";

// for socket connection
import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:4000");
// const socket = socketIO.connect("http://127.0.0.1:4000");
// const socket = socketIO.connect("https://e0d9-2409-4043-4c1d-30e9-d108-c3a4-49d2-8393.ngrok-free.app");


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/live_map" element={<LiveMap web_socket={socket}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
