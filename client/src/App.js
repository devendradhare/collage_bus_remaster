// hooks imoprts
import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// components imports
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import LiveMap from "./components/LiveMap";
 
// for socket connection
import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:4000");

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  useEffect(
    () => {
      if (isAuthenticated) {
        console.log("app.js", user);
        socket.emit("user_info", user);
      }
    },
    [isAuthenticated]
  );
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/live_map" element={<LiveMap web_socket={socket} />} />
        <Route path="/about" element={<About web_socket={socket}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
