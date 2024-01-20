import React from "react";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import "./home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <h1>Collage Bus Live</h1>
      <p>Introducing our College Cruiser Tracker – the ultimate sidekick for a stress-free bus journey! Imagine having the power to know exactly where your college bus is in real-time. Our web app makes it a breeze for students and bus drivers to stay in the loop, ensuring a smooth and safe ride. It's like having a personal GPS for your daily adventures! 🚍</p>
      <Link to="/live_map">
        <Fab variant="extended" size="medium" color="primary">
          <NavigationIcon sx={{ mr: 1 }} />
          Go to map
        </Fab>
      </Link>
    </div>
  );
}
