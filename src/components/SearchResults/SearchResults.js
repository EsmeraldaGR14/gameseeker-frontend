import React, { useState, useEffect } from "react";
import { getGamesByTitle } from "../Api/API";

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
      // If searchCriteria.title is empty, you can choose to display a message or leave the list empty.
      setSearchResults([]);
    }
  }, [searchCriteria.title]);

  return (
    <div>
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
        {searchCriteria.title ? (
          searchResults.map((game) => (
            <div key={game.id}>
              <h2>
                {game.title} ({game.released_year})
              </h2>
              <h3>{game.platform}</h3>
            </div>
          ))
        ) : (
          <p>Enter a title to search for games.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResultsPage;
