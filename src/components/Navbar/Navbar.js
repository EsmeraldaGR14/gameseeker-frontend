import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "../Searchbar/Searchbar";
import logoImage from "../Font-assets/GameSeekerLogo.png";
import hamburgerMenu from "../Font-assets/icons8-hamburger-menu.svg";
import closeHamburgerMenu from "../Font-assets/icons8-x-96.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
      <div className="navbar-logo">
        <img className="brand-logo" src={logoImage} alt="Logo" />
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
      <div className="navbar-icon" onClick={toggleMenu}>
        
        <img className="burger-menu" src={isMenuOpen ? closeHamburgerMenu : hamburgerMenu } alt="" />
      </div>
    </nav>
  );
}

export default Navbar;
