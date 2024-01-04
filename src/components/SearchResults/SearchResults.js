/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { getAllGames } from "../../utilities/Api/Games";
import "./SearchResults.css";
import { useLocation, Link } from "react-router-dom";
import ScrollButton from "../../utilities/common/ScrollButton/ScrollButton";
import { extractYear } from "../../utilities/helpers/extractYear";
import BoxArt from "../BoxArt/BoxArt";
import Modal from "../../utilities/common/Modal/Modal";
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

function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState([]);
  // const [viewType, setViewType] = useState("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  const handleSearch = async (query) => {
    try {
      const allGames = await getAllGames();
      const filteredGames = allGames.filter((game) =>
        game.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredGames || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  const handleFilter = () => {
    try {
      let filteredGames = [...searchResults];
      if (selectedServices.length > 0) {
        filteredGames = filteredGames.filter(
          (game) =>
            Array.isArray(game.subscription) &&
            game.subscription.some((sub) => selectedServices.includes(sub))
        );
      }

      setFilteredResults(filteredGames);
      console.log(filteredGames);
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
    console.log(
      `Checkbox for service "${service}" clicked. Updated services:`,
      updatedServices
    );
    //  console.log(`originalGames ${[originalGames]}`);
    console.log(`Games ${searchResults}`);
  };

  useEffect(() => {
    // Clear filtered results when no services are selected
    if (selectedServices.length === 0) {
      setFilteredResults([]);
    } else {
      handleFilter();
    }
  }, [selectedServices, searchResults]);;

  // const handleSort = (criteria) => {
  //   setSortCriteria(criteria);
  //   setSelectedSortCriteria(criteria);
  //   handleSearch(searchQuery);
  // };

  // const handleView = (view) => {
  //   setViewType(view);
  // };

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const openModal = () => {
    setIsModalOpen(true);

    // const modalElement = document.querySelector(".search-modal-id");
    // if (modalElement) {
    //   modalElement.scrollIntoView({ behavior: "smooth", block: "end" });
    // }
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="container">
      <SortingButtons
        games={searchResults}
        setSortedGames={setSearchResults}
      />
      <div className="subscription-filter">
        <div className="dropdown">
          <div className="dropdown-title" onClick={toggleDropdown}>
            <span>
              {selectedServices.length === 0
                ? "Select Services"
                : selectedServices.join(", ")}
            </span>
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
      <div className="search-results grid-view">
        <div className={`search-results-title`}>
          <h1>Search Results</h1>
          {filteredResults.length > 0 ? (
            <p>
              {filteredResults.length} result(s) found for "{selectedServices}":
            </p>
          ) : (
            searchResults.length > 0 && (
              <p>
                {searchResults.length} result(s) found for "{searchQuery}":
              </p>
            )
          )}
        </div>
        <div className="search-results grid-view">
          {filteredResults.length > 0
            ? filteredResults.map((game) => (
                <Link
                  to={`/games/${game.id}`}
                  className="item-link"
                  key={game.id}
                >
                  <BoxArt
                    className="boxart"
                    image={game.boxart}
                    name={game.title}
                    year={extractYear(game.release_date)}
                    openModal={openModal}
                  />
                </Link>
              ))
            : searchResults.map((game) => (
                <Link
                  to={`/games/${game.id}`}
                  className="item-link"
                  key={game.id}
                >
                  <BoxArt
                    className="boxart"
                    image={game.boxart}
                    name={game.title}
                    year={extractYear(game.release_date)}
                    openModal={openModal}
                  />
                </Link>
              ))}
          <ScrollButton />
          <div className="search-modal-id">
            {isModalOpen && (
              <Modal
                isOpen={isModalOpen}
                title="Cannot add to list"
                message="If you want to use this feature please sign up for an account."
                type={"error"}
                onClose={closeModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResultsPage;
