import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "../Searchbar/Searchbar";
import logoImage from "../Font-assets/GameSeekerLogo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-icon"></div>
      <div className="navbar-logo">
        <img src={logoImage} alt="Logo" />
      </div>
      <SearchBar />
      <div className="navbar-links">
        <NavLink className="navbar-link" activeClassName="active-link" to="/">
          HOME
        </NavLink>
        <NavLink
          className="navbar-link"
          activeClassName="active-link"
          to="/catalog"
        >
          GAMES
        </NavLink>
        <NavLink
          className="navbar-link"
          activeClassName="active-link"
          to="/collection"
        >
          COLLECTION
        </NavLink>
        <NavLink
          className="navbar-link"
          activeClassName="active-link"
          to="/backlog"
        >
          BACKLOG
        </NavLink>
        <NavLink
          className="navbar-link"
          activeClassName="active-link"
          to="/help"
        >
          HELP
        </NavLink>
        <NavLink
          className="navbar-link"
          activeClassName="active-link"
          to="/login"
        >
          LOG&nbsp;IN
        </NavLink>
        <NavLink
          className="navbar-link"
          activeClassName="active-link"
          to="/signup"
        >
          SIGN&nbsp;UP
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
