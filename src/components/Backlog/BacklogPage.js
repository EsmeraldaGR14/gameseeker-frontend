/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
//import { useParams } from "react-router-dom";
import { useUser } from "../UserContext";
import { getGameBacklog } from "../../utilities/Api/Backlog";
import "./backlog.css";
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

function Backlog() {
  const { user, backlog } = useUser();
  const [games, setGames] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedServicesMessage, setSelectedServicesMessage] = useState("");

  useEffect(() => {
    getBacklogById();
  }, [backlog]);

  async function getBacklogById() {
    try {
      let result = await getGameBacklog(user.id);
      setGames(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleFilter = async () => {
    try {
      let allGames = [...games];
      let message = "";
      if (selectedServices.length > 0) {
        allGames = allGames.filter(
          (game) =>
            Array.isArray(game.subscription) &&
            game.subscription.some((sub) => selectedServices.includes(sub))
        );
        message = `Filtered by ${
          selectedServices.length
        } service(s): ${selectedServices.join(", ")}`;
      }

      setFilteredResults(allGames);
      setSelectedServicesMessage(message);
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
      setSelectedServicesMessage("");
    } else {
      handleFilter();
    }
  }, [selectedServices]);

  return (
    <>
      <div className="container">
        <h1>Backlog</h1>
        <h2>
          {games.length > 0
            ? `You have ${games.length} game(s) in your backlog.`
            : "Add games to your backlog!"}
        </h2>
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
        {selectedServicesMessage && (
          <div className="selected-services-message">
            {selectedServicesMessage}
          </div>
        )}
        <div className="backlog-container">
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

export default Backlog;
