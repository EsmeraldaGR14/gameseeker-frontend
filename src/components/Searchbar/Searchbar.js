import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGamesByTitle } from "../Api/API";
import SearchResultsOverlay from "../SearchResultsOverlay/SearchResultsOverlay";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    try {
      const response = await getGamesByTitle(query);
      setSearchResults(response.data || []); // Ensure searchResults is always an array
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]); // Handle the error by setting an empty array
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/searchresults?title=${searchInput}`);
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    if (query === "") {
      // Clear search results when the input field is empty
      setSearchResults([]);
    } else {
      handleSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={searchInput}
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
      {searchResults.length > 0 && (
        <SearchResultsOverlay searchResults={searchResults} />
      )}
    </form>
  );
};

export default SearchBar;
