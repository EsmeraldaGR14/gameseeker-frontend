/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { getAllGames } from "../../utilities/Api/Games";
import "./SearchResults.css";
import { useLocation, Link } from "react-router-dom";
import ScrollButton from "../../utilities/common/ScrollButton/ScrollButton";
import { extractYear } from "../../utilities/helpers/extractYear";
import BoxArt from "../BoxArt/BoxArt";
import Modal from "../../utilities/common/Modal/Modal";

function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("relevance");
  const [selectedSortCriteria, setSelectedSortCriteria] = useState("relevance");
  const [viewType, setViewType] = useState("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query");

  const handleSearch = async (query) => {
    try {
      const allGames = await getAllGames();
      const filteredGames = allGames.filter((game) =>
        game.title.toLowerCase().includes(query.toLowerCase())
      );
      if (sortCriteria === "title") {
        filteredGames.sort((a, b) =>
          a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        );
      } else if (sortCriteria === "releaseDate") {
        filteredGames.sort((a, b) =>
          extractYear(a.release_date).toString().localeCompare(extractYear(b.release_date).toString())
        );
      // } else if (sortCriteria === "rating") {
      //   filteredGames.sort((a, b) => a.rating.localeCompare(b.rating));
      }
      setSearchResults(filteredGames || []);
      console.log(searchResults)
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
    setSelectedSortCriteria(criteria);
    handleSearch(searchQuery);
  };

  // const handleView = (view) => {
  //   setViewType(view);
  // };

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, sortCriteria]);

  const openModal = () => {
    setIsModalOpen(true);

    const modalElement = document.querySelector(".search-modal-id");
    if (modalElement) {
      modalElement.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="container">
      <div className="sort-buttons">
        {/* <button type="button" onClick={() => handleView("list")}>
          List View
        </button>
        <button type="button" onClick={() => handleView("grid")}>
          Grid View
        </button> */}
        <button
          type="button"
          onClick={() => handleSort("relevance")}
          className={selectedSortCriteria === "relevance" ? "selected" : ""}
        >
          Relevance
        </button>
        <button
          type="button"
          onClick={() => handleSort("title")}
          className={selectedSortCriteria === "title" ? "selected" : ""}
        >
          Title
        </button>
        <button
          type="button"
          onClick={() => handleSort("releaseDate")}
          className={selectedSortCriteria === "releaseDate" ? "selected" : ""}
        >
          Release Date
        </button>
        {/* <button
          type="button"
          onClick={() => handleSort("rating")}
          className={selectedSortCriteria === "rating" ? "selected" : ""}
        >
          Rating
        </button> */}
      </div>
      <div
        className={`search-results ${
          viewType === "list" ? "list-view" : "grid-view"
        }`}
      >
        <div className={`search-results-title`}>
          <h1>Search Results</h1>
          {searchResults.length > 0 ? (
            <p>
              {searchResults.length} result(s) found for "{searchQuery}":
            </p>
          ) : (
            <p>Sorry, there are no results.</p>
          )}
        </div>
        <div
          className={`search-results ${
            viewType === "list" ? "list-view" : "grid-view"
          }`}
        >
          {searchResults.map((game) => (
            <Link to={`/games/${game.id}`} className="item-link" key={game.id}>
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
