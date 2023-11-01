import React, { useState, useEffect } from "react";
import { getGamesByTitle } from "../Api/API";
import "./SearchResults.css"

function SearchResultsPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    title: "",
  });

  const handleSearch = async () => {
    try {
      const response = await getGamesByTitle(searchCriteria.title);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    if (searchCriteria.title) {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchCriteria.title]);

  return (
    <div className="search">
      <h1>Search Results</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={searchCriteria.title}
          onChange={(e) =>
            setSearchCriteria({ ...searchCriteria, title: e.target.value })
          }
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {searchResults.length > 0 ? (
          <p>{searchResults.length} result(s) found for "{searchCriteria.title}":</p>
        ) : (
          <p>Sorry, there are no results.</p>
        )}
          {searchResults.map((game) => (
            <div key={game.id}>
              <h2>
                {game.title} ({game.released_year})
              </h2>
              <h3>{game.platform}</h3>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchResultsPage;
