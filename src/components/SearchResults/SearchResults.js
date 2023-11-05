import React, { useState, useEffect } from "react";
import { getGamesByTitle, getCovers } from "../Api/API";
import "./SearchResults.css"
import { useLocation } from "react-router-dom";

function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("title");
  const [covers, setCovers] = useState([]);

  const fetchCovers = async () => {
    try {
      const coverData = await getCovers();
      setCovers(coverData);
    } catch (error) {
      console.error("Error fetching covers:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await getGamesByTitle(searchQuery);
      setSearchResults(response.data);
      fetchCovers();
    } catch (error) {
      console.log("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchCovers();
  }, []);

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
            <h3>{game.platform}</h3>
            {/* Map through covers and find the one with the matching game ID */}
            {covers.map((cover) => {
              if (cover.game === game.id) {
                return (
                  <img
                    key={cover.id}
                    src={cover.url}
                    alt={`${game.title} Cover`}
                  />
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResultsPage;
