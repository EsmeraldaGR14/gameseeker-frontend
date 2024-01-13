/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from "react";
import { extractYear } from "../../helpers/extractYear";
import "./SortingButtons.css";

function SortingButtons({ games, setSortedGames, isSearchResults }) {
  const [sortCriteria, setSortCriteria] = useState(
    isSearchResults ? "relevance" : "dateAdded"
  );
  const [selectedSortCriteria, setSelectedSortCriteria] = useState(
    isSearchResults ? "relevance" : "dateAdded"
  );

  const removeTheFromTitle = (title) => {
    const normalizedTitle = title.toLowerCase();
    return normalizedTitle.startsWith("the ")
      ? normalizedTitle.slice(4)
      : normalizedTitle;
  };

  const handleCriteria = (criteria) => {
    setSortCriteria(criteria);
    setSelectedSortCriteria(criteria);
  };

  const handleSort = useCallback(() => {
    try {
      let sortedGames = [...games];

      if (sortCriteria === "title") {
        sortedGames.sort((a, b) =>
          removeTheFromTitle(a.title).localeCompare(removeTheFromTitle(b.title))
        );
      } else if (sortCriteria === "releaseDate") {
        sortedGames.sort((a, b) => {
          const releaseDateA = extractYear(a.release_date);
          const releaseDateB = extractYear(b.release_date);

          if (releaseDateA === "N/A" && releaseDateB !== "N/A") {
            return 1; // Move games with "N/A" release date to the bottom
          } else if (releaseDateB === "N/A" && releaseDateA !== "N/A") {
            return -1; // Move games with "N/A" release date to the bottom
          } else {
            // Handle valid date strings
            const dateA = new Date(releaseDateA).getTime();
            const dateB = new Date(releaseDateB).getTime();

            return dateB - dateA;
          }
        });
      } else if (sortCriteria === "dateAdded") {
        sortedGames.sort((a, b) => {
          return a.index - b.index;
        });
      }
      setSortedGames(sortedGames);
    } catch (error) {
      console.error("Error sorting games:", error);
    }
  }, [games, sortCriteria, setSortedGames]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    handleSort();
  }, [sortCriteria]);

  return (
    <div className="container">
      <div className="sort-buttons">
        {isSearchResults && (
          <button
            type="button"
            onClick={() => handleCriteria("relevance")}
            className={selectedSortCriteria === "relevance" ? "selected" : ""}
          >
            Relevance
          </button>
        )}
        <button
          type="button"
          onClick={() => handleCriteria("dateAdded")}
          className={selectedSortCriteria === "dateAdded" ? "selected" : ""}
        >
          Date Added
        </button>
        <button
          type="button"
          onClick={() => handleCriteria("title")}
          className={selectedSortCriteria === "title" ? "selected" : ""}
        >
          Title
        </button>
        <button
          type="button"
          onClick={() => handleCriteria("releaseDate")}
          className={selectedSortCriteria === "releaseDate" ? "selected" : ""}
        >
          Release Date
        </button>
      </div>
    </div>
  );
}

export default SortingButtons;
