import React, { useState, useCallback, useEffect } from "react";
import { extractYear } from "../../helpers/extractYear";
import "./SortingandFilteringButtons.css"

function SortingandFilteringButtons({ games, setSortedGames }) {
  const [sortCriteria, setSortCriteria] = useState("relevance");
  const [selectedSortCriteria, setSelectedSortCriteria] = useState("relevance");

  const removeTheFromTitle = (title) => {
    const normalizedTitle = title.toLowerCase();
    return normalizedTitle.startsWith("the ")
      ? normalizedTitle.slice(4)
      : normalizedTitle;
  };

   const handleSortAndFilter = (criteria) => {
     setSortCriteria(criteria);
     setSelectedSortCriteria(criteria);
   };

   const handleSort = useCallback(() => {
     try {
       let sortedGames = [...games];

       if (sortCriteria === "title") {
         console.log("Sorting by title");
         sortedGames.sort((a, b) =>
           removeTheFromTitle(a.title).localeCompare(
             removeTheFromTitle(b.title)
           )
         );
       } else if (sortCriteria === "releaseDate") {
         console.log("Sorting by date");
         sortedGames.sort((a, b) =>
           extractYear(a.release_date)
             .toString()
             .localeCompare(extractYear(b.release_date).toString())
         );
       }
       setSortedGames(sortedGames);
       console.log(sortedGames);
     } catch (error) {
       console.error("Error sorting games:", error);
     }
   }, [games, sortCriteria, setSortedGames]);

   useEffect(() => {
     handleSort();
   }, [sortCriteria]);

  return (
    <div className="container">
      <div className="sort-buttons">
        <button
          type="button"
          onClick={() => handleSortAndFilter("relevance")}
          className={selectedSortCriteria === "relevance" ? "selected" : ""}
        >
          Relevance
        </button>
        <button
          type="button"
          onClick={() => handleSortAndFilter("title")}
          className={selectedSortCriteria === "title" ? "selected" : ""}
        >
          Title
        </button>
        <button
          type="button"
          onClick={() => handleSortAndFilter("releaseDate")}
          className={selectedSortCriteria === "releaseDate" ? "selected" : ""}
        >
          Release Date
        </button>
      </div>
    </div>
  );
}

export default SortingandFilteringButtons;
