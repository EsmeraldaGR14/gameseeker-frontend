import "./SearchResultsOverlay.css";
import { Link } from "react-router-dom";

const SearchResultsOverlay = ({ searchResults }) => {
  return (
    <div className="search-results-overlay">
      {searchResults.length > 0 && (
        <ul className="search-results-list">
          {searchResults.map((result) => (
            <Link to={`/game/${result.id}`}>
            <li className="search-results-item" key={result.id}>
              {result.title} ({result.released_year})
            </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResultsOverlay;
