import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAllGames } from "../../utilities/Api/Games";
import SearchResultsOverlay from "../SearchResultsOverlay/SearchResultsOverlay";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const handleSearch = async (query) => {
    try {
      const allGames = await getAllGames();
      const filteredGames = allGames.filter((game) =>
        game.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredGames || []);
      setOverlayVisible(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
      setOverlayVisible(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/searchresults?query=${searchInput}`);
    setOverlayVisible(false);
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setOverlayVisible(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={searchInput}
        onChange={handleInputChange}
        ref={searchInputRef}
        required
      />
      <button type="submit">Search</button>
      {overlayVisible && <SearchResultsOverlay searchResults={searchResults} />}
    </form>
  );
};

export default SearchBar;
