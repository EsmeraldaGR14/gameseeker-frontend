/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { getAllGames } from "../../utilities/Api/Games";
import "./SearchResults.css";
import { useLocation, Link } from "react-router-dom";
import ScrollButton from "../../utilities/common/ScrollButton/ScrollButton";

function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("relevance");
  const [viewType, setViewType] = useState("list");
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
          a.released_year.localeCompare(b.released_year)
        );
      } else if (sortCriteria === "rating") {
        filteredGames.sort((a, b) => a.rating.localeCompare(b.rating));
      }
      setSearchResults(filteredGames || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  const extractYear = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
    handleSearch(searchQuery);
  };

  const handleView = (view) => {
    setViewType(view);
  };

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, sortCriteria]);

  return (
    <div className="search-results-container">
      <div className="sort-buttons">
        <button type="button" onClick={() => handleView("list")}>
          List View
        </button>
        <button type="button" onClick={() => handleView("grid")}>
          Grid View
        </button>
        <button type="button" onClick={() => handleSort("relevance")}>
          Relevance
        </button>
        <button type="button" onClick={() => handleSort("title")}>
          Title
        </button>
        <button type="button" onClick={() => handleSort("releaseDate")}>
          Release Date
        </button>
        <button type="button" onClick={() => handleSort("rating")}>
          Rating
        </button>
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
            <div className="search-results-item" key={game.id}>
              <Link to={`/games/${game.id}`}>
                <h2>
                  {game.title} ({extractYear(game.released_year)})
                </h2>
                <h3>{game.platforms.join(", ")}</h3>
              </Link>
            </div>
          ))}
          <ScrollButton />
        </div>
      </div>
    </div>
  );
}

export default SearchResultsPage;
