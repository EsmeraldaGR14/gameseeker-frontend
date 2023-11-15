import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "../Searchbar/Searchbar";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-icon"></div>
      <div className="navbar-links">
        <SearchBar />
        <NavLink className="navbar-link" to="/">
          Home
        </NavLink>
        <NavLink className="navbar-link" to="/catalog">
          Games
        </NavLink>
        <NavLink className="navbar-link" to="/collection">
          Collection
        </NavLink>
        <NavLink className="navbar-link" to="/backlog">
          Backlog
        </NavLink>
        <NavLink className="navbar-link" to="/help">
          Help
        </NavLink>
        <NavLink className="navbar-link" to="/login">
          Log In
        </NavLink>
        <NavLink className="navbar-link" to="/signup">
          Sign Up
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
