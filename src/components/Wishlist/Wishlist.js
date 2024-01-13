/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import { getGameWishlist } from "../../utilities/Api/Wishlist";
import "./Wishlist.css";
import BoxArt from "../BoxArt/BoxArt";
import { Link } from "react-router-dom";
import ScrollButton from "../../utilities/common/ScrollButton/ScrollButton";
import { extractYear } from "../../utilities/helpers/extractYear";
import SortingButtons from "../../utilities/common/SortingButtons/SortingButtons";

const subscriptionServices = [
  "PlayStation Plus Essential",
  "PlayStation Plus Extra",
  "PlayStation Plus Premium",
  "Xbox Game Pass Core",
  "Xbox Game Pass",
  "PC Game Pass",
  "GeForce Now",
  "Nintendo Switch Online",
  "Ubisoft+",
  "Apple Arcade",
];

function Wishlist() {
  const { user, userWishlist } = useUser();
  const [games, setGames] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    getGameWishlistById();
  }, [userWishlist]);

  async function getGameWishlistById() {
    try {
      let result = await getGameWishlist(user.id);
      setGames(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleFilter = async () => {
    try {
      let allGames = [...games];
      if (selectedServices.length > 0) {
        allGames = allGames.filter(
          (game) =>
            Array.isArray(game.subscription) &&
            game.subscription.some((sub) => selectedServices.includes(sub))
        );
      }

      setFilteredResults(allGames);
    } catch (error) {
      console.error("Error filtering games:", error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleServiceToggle = (service) => {
    const updatedServices = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];

    setSelectedServices(updatedServices);
  };

  useEffect(() => {
    if (selectedServices.length === 0) {
      setFilteredResults([]);
    } else {
      handleFilter();
    }
  }, [selectedServices]);

  return (
    <>
      <div className="container">
        <div className="sorting-and-filtering">
          <SortingButtons
            games={games}
            setSortedGames={setGames}
            isSearchResults={false}
          />
          <div className="subscription-filter">
            <div className="dropdown">
              <div className="dropdown-title" onClick={toggleDropdown}>
                <span>Filter by Services</span>
                <span className={`arrow ${isDropdownOpen ? "up" : "down"}`}>
                  {isDropdownOpen ? "\u25B2" : "\u25BC"}
                </span>
              </div>
              {isDropdownOpen && (
                <div className="dropdown-options">
                  {subscriptionServices.map((service) => (
                    <div
                      key={service}
                      className="option"
                      onClick={() => handleServiceToggle(service)}
                    >
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service)}
                        onChange={() => {}}
                      />
                      {service}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <h1>Wishlist</h1>
        <h2>
          {games.length > 0
            ? `You have ${games.length} game(s) in your wishlist.`
            : "Add games to your wishlist!"}
        </h2>
        <div className="wishlist-container">
          {filteredResults.length > 0
            ? filteredResults.map((game) => (
                <Link
                  to={`/games/${game.id}`}
                  className="boxart-container"
                  key={game.id}
                >
                  <BoxArt
                    image={game.boxart}
                    name={game.title}
                    year={extractYear(game.release_date)}
                    gameId={game.id}
                  />
                </Link>
              ))
            : games?.map(({ id, title, boxart, release_date }) => (
                <Link key={id} to={`/games/${id}`} className="boxart-container">
                  <BoxArt
                    image={boxart}
                    name={title}
                    year={extractYear(release_date)}
                    gameId={id}
                  />
                </Link>
              ))}
        </div>
      </div>
      <ScrollButton />
    </>
  );
}

export default Wishlist;
