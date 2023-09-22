import React from "react";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import "./home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <h1>Collage Bus Live</h1>
      <p>Track your collage bus live</p>
      <Link to="/live_map">
        <Fab variant="extended" size="medium" color="primary">
          <NavigationIcon sx={{ mr: 1 }} />
          Go to map
        </Fab>
      </Link>
    </div>
  );
}
