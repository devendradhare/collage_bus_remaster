import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import "../css/Navbar.css";

export default function Navbar() {
  const [bx, setbx] = useState("bx bx-menu");
  const [navbar, setnavbar] = useState("navbar navbar_active");
  const [Is_link_active, setIs_link_active] = useState({
    home: "active"
  });
  const location = useLocation();
  console.log(location.pathname);

  const Activate_on_click = link_name => {
    const new_obj = {};
    new_obj[link_name] = "active";
    setIs_link_active(new_obj);
  };

  const menu_icon_clicked = () => {
    setbx(bx !== "bx bx-menu" ? "bx bx-menu" : "bx bx-menu bx-x");
    setnavbar(navbar !== "navbar" ? "navbar" : "navbar navbar_active");
  };
  return (
    <header>
      <Link to="/" className="logo">
        <i className="ri-home-heart-fill" />
        <span>Codendram</span>
      </Link>
      <ul className={navbar /*"navbar navbar_active" : "navbar"*/}>
        <li
          onClick={() => {
            Activate_on_click("home");
          }}
        >
          <Link to="/Home" className={Is_link_active.home}>
            Home
          </Link>
        </li>
        <li
          onClick={() => {
            Activate_on_click("about");
          }}
        >
          <Link to="/About" className={Is_link_active["about"]}>
            About Us
          </Link>
        </li>
        <li
          onClick={() => {
            Activate_on_click("services");
          }}
        >
          <Link to="/services" className={Is_link_active["services"]}>
            Services
          </Link>
        </li>
        <li
          onClick={() => {
            Activate_on_click("blog");
          }}
        >
          <Link to="/" className={Is_link_active["blog"]}>
            Blogs
          </Link>
        </li>
        <li
          onClick={() => {
            Activate_on_click("contact");
          }}
        >
          <Link to="/" className={Is_link_active["contact"]}>
            Contect
          </Link>
        </li>
      </ul>

      <div className="main">
        <Link to="/login" className="user">
          <i className="ri-user-3-fill" />LogIn
        </Link>
        <Link to="/">Register</Link>
        <div className={bx} id="menu-icon" onClick={menu_icon_clicked} />
      </div>
    </header>
  );
}
