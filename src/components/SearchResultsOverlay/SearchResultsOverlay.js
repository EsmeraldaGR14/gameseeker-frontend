import "./SearchResultsOverlay.css";

const SearchResultsOverlay = ({ searchResults }) => {
  return (
    <div className="search-results-overlay">
      {searchResults.length > 0 && (
        <ul className="search-results-list">
          {searchResults.map((result) => (
            <li className="search-results-item" key={result.id}>
              {result.title} ({result.released_year})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResultsOverlay;
