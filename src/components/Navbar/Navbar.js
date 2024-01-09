import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import SearchBar from "../Searchbar/Searchbar";
import logoImage from "../Font-assets/GameSeekerLogo.png";
import hamburgerMenu from "../Font-assets/icons8-hamburger-menu.svg";
import closeHamburgerMenu from "../Font-assets/icons8-x-96.png";
import { useUser } from "../UserContext";
import { getAllGames } from "../../utilities/Api/Games";

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

  async function handleRandomGame() {
    try {
      const allGames = await getAllGames();
      const gameIds = allGames.map((game) => game.id);
      const randomIndex = Math.floor(Math.random() * gameIds.length);
      const randomGameId = gameIds[randomIndex];
      navigate(`/games/${randomGameId}`);
    } catch (error) {
      console.log(error);
    }
  }

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
          {user.isLoggedIn && (
            <>
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
                to="/wishlist"
              >
                WISHLIST
              </NavLink>
            </>
          )}
          {/* Other links... */}
          {user.isLoggedIn ? (
            <>
              <NavLink
                className="navbar-link"
                activeClassName="active-link"
                to="/account"
              >
                ACCOUNT
              </NavLink>
              <NavLink
                className="navbar-link"
                activeClassName="active-link"
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
                activeClassName="active-link"
                to="/login"
              >
                LOG IN
              </NavLink>
              <NavLink
                className="navbar-link"
                activeClassName="active-link"
                to="/signup"
              >
                SIGN UP
              </NavLink>
            </>
          )}
          <NavLink
            className="navbar-link random-game-button"
            onClick={handleRandomGame}
          >
            PICK FOR ME
          </NavLink>
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
