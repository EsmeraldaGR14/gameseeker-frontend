import "./SearchResultsOverlay.css";
import { Link } from "react-router-dom";
import { extractYear } from "../../utilities/helpers/extractYear";
import React from "react";
import BoxArt from "../BoxArt/BoxArt";

const SearchResultsOverlay = ({ searchResults, overlayVisible }) => {
  return (
    <>
      {overlayVisible && <div className="overlay-background"></div>}
      <div
        className={`search-results-overlay ${overlayVisible ? "visible" : ""}`}
      >
        {searchResults.length > 0 && (
          <ul className="search-results-list">
            {searchResults.map((result) => (
              <Link to={`/games/${result.id}`} key={result.id}>
                <li className="search-results-item">
                  <BoxArt
                    className="boxart"
                    image={result.boxart}
                    year={extractYear(result.release_date)}
                  />
                <div className="item-details">
                  {result.title} ({extractYear(result.release_date)})
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchResultsOverlay;
