// hooks imoprts
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// components imports
import Navbar from "./components/Navbar";
import LiveMap from "./components/liveMap/LiveMap";
import Home from "./components/home/Home";
import AboutMe from "./components/aboutMe/AboutMe";

// for socket connection
import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:4000");
// const socket = socketIO.connect("https://mlmrtdbn-4000.inc1.devtunnels.ms/");
// const socket = socketIO.connect("https://dvn-live-server.onrender.com");

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/live_map" element={<LiveMap web_socket={socket} />} />
        <Route path="/about" element={<AboutMe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
