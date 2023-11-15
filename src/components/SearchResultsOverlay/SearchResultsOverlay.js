import "./SearchResultsOverlay.css";
import { Link } from "react-router-dom";
import { extractYear } from "../../utilities/Api/Games";
import React from "react";

const SearchResultsOverlay = ({ searchResults }) => {
  return (
    <div className="search-results-overlay">
      {searchResults.length > 0 && (
        <ul className="search-results-list">
          {searchResults.map((result) => (
            <Link to={`/games/${result.id}`} key={result.id}>
              <li className="search-results-item">
                <img
                  className="boxart"
                  style={{ height: "5rem" }}
                  src={result.boxart}
                  alt={`${result.title} Box Art`}
                />
                {result.title} ({extractYear(result.release_date)})
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResultsOverlay;
