import React, { useState, useEffect } from "react";
import { getAllGames } from "../../utilities/Api/Games";
import "./SearchResults.css";
import { useLocation } from "react-router-dom";

function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query");

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

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <div className="search">
      <h1>Search Results</h1>
      <div>
        {searchResults.length > 0 ? (
          <p>
            {searchResults.length} result(s) found for "{searchQuery}":
          </p>
        ) : (
          <p>Sorry, there are no results.</p>
        )}
        {searchResults.map((game) => (
          <div key={game.id}>
            <h2>
              {game.title} ({game.released_year})
            </h2>
            <h3>{game.platforms.join(", ")}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResultsPage;
