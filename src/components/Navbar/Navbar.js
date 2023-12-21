import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "../Searchbar/Searchbar";
import logoImage from "../Font-assets/GameSeekerLogo.png";
import hamburgerMenu from "../Font-assets/icons8-hamburger-menu.svg";
import closeHamburgerMenu from "../Font-assets/icons8-x-96.png";
import { useUser } from "../UserContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <div className="navbar-container">
    <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
      <div className="navbar-links">
        <NavLink to="/" className="navbar-logo">
          <img className="brand-logo" src={logoImage} alt="Logo" />
        </NavLink>
        <SearchBar />
        <NavLink className="navbar-link" activeclassname="active-link" to="/">
          HOME
        </NavLink>
        <NavLink
          className="navbar-link"
          activeclassname="active-link"
          to="/catalog"
        >
          CATALOG
        </NavLink>
        <NavLink
          className="navbar-link"
          activeclassname="active-link"
          to="/collection"
        >
          COLLECTION
        </NavLink>
        <NavLink
          className="navbar-link"
          activeclassname="active-link"
          to="/backlog"
        >
          BACKLOG
        </NavLink>
        <NavLink
          className="navbar-link"
          activeclassname="active-link"
          to="/help"
        >
          HELP
        </NavLink>
        {user.isLoggedIn ? (
          <>
            <NavLink
              className="navbar-link"
              activeclassname="active-link"
              to="/account"
            >
              ACCOUNT
            </NavLink>
            <NavLink
              className="navbar-link"
              activeclassname="active-link"
              onClick={handleLogout}
              to="/"
            >
              LOG OUT
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              className="navbar-link"
              activeclassname="active-link"
              to="/login"
            >
              LOG IN
            </NavLink>
            <NavLink
              className="navbar-link"
              activeclassname="active-link"
              to="/signup"
            >
              SIGN UP
            </NavLink>
          </>
        )}
      </div>
      <div className="navbar-icon" onClick={toggleMenu}>
        <img
          className="burger-menu"
          src={isMenuOpen ? closeHamburgerMenu : hamburgerMenu}
          alt=""
        />
      </div>
    </nav>
    </div>
  );
}

export default Navbar;
