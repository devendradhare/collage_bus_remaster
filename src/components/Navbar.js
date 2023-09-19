import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Avatar from "@mui/material/Avatar";
import "../css/Navbar.css";

import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

export default function Navbar() {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [bx, setbx] = useState("bx bx-menu");
  const [navbar, setnavbar] = useState("navbar navbar_active");
  const [Close_menu, setClose_menu] = useState("close_menu_not_active");
  const [Is_link_active, setIs_link_active] = useState({});
  useEffect(
    () => {
      console.log(user);
    },
    [user]
  );
  const Activate_on_click = link_name => {
    console.log(link_name);
    const new_obj = {};
    new_obj[link_name] = "active";
    setIs_link_active(new_obj);
  };

  const menu_icon_clicked = () => {
    setbx(bx !== "bx bx-menu" ? "bx bx-menu" : "bx bx-menu bx-x");
    setnavbar(navbar !== "navbar" ? "navbar" : "navbar navbar_active");
    setClose_menu(
      Close_menu === "close_menu_not_active"
        ? "close_menu_active"
        : "close_menu_not_active"
    );
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header>
      <Link to="/" className="logo">
        <i className="ri-home-heart-fill" />
        <span>Codendram</span>
      </Link>
      <div className={Close_menu} onClick={menu_icon_clicked}>
        <ul className={navbar /*"navbar navbar_active" : "navbar"*/}>
          <li
            onClick={() => {
              Activate_on_click("home");
            }}
          >
            <Link to="/Home" className={Is_link_active["home"]}>
              Home
            </Link>
          </li>
          <li
            onClick={() => {
              Activate_on_click("live_map");
            }}
          >
            <Link to="/live_map" className={Is_link_active["live_map"]}>
              Map
            </Link>
          </li>
          <li
            onClick={() => {
              Activate_on_click("about");
            }}
          >
            <Link to="/About" className={Is_link_active["about"]}>
              developer
            </Link>
          </li>
        </ul>
      </div>

      <div className="main">
        {isAuthenticated
          ? <div>
              <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar
                  sx={{ margin: 1, width: 24, height: 24 }}
                  alt="Remy Sharp"
                  src={user.picture}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    logout({
                      logoutParams: { returnTo: window.location.origin }
                    });
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          : <Link className="user" onClick={() => loginWithRedirect()}>
              <i className="ri-user-3-fill" />
              Log In
            </Link>}

        <div className={bx} id="menu-icon" onClick={menu_icon_clicked} />
      </div>
    </header>
  );
}

// inside user :
// email: "getkine03@gmail.com";
// email_verified: true;
// family_name: "kine";
// given_name: "get.";
// locale: "en-GB";
// name: "get. kine";
// nickname: "getkine03";
// picture: "https://profile-pic-url";
// sub: "google-oauth2|102496200038435937517";
// updated_at: "2023-09-19T08:00:13.511Z";
