import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "../Searchbar/Searchbar";
import logoImage from "../Font-assets/GameSeekerLogo.png";
import { useUser } from "../UserContext";

function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Redirect to the home page after logout
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-icon"></div>

      <div className="navbar-links">
        <NavLink to="/" className="navbar-logo">
          <img src={logoImage} alt="Logo" />
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
            <button className="navbar-link" onClick={handleLogout}>
              LOG OUT
            </button>
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
    </nav>
  );
}

export default Navbar;
