import React, { useState, useCallback, useEffect } from "react";
import { extractYear } from "../../helpers/extractYear";
import "./SortingButtons.css"

function SortingButtons({ games, setSortedGames }) {
  const [sortCriteria, setSortCriteria] = useState("relevance");
  const [selectedSortCriteria, setSelectedSortCriteria] = useState("relevance");

  const removeTheFromTitle = (title) => {
    const normalizedTitle = title.toLowerCase();
    return normalizedTitle.startsWith("the ")
      ? normalizedTitle.slice(4)
      : normalizedTitle;
  };

   const handleCriteria = (criteria) => {
     setSortCriteria(criteria);
     setSelectedSortCriteria(criteria);
     console.log(games)
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
       console.log(sortedGames)
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
        <button
          type="button"
          onClick={() => handleCriteria("relevance")}
          className={selectedSortCriteria === "relevance" ? "selected" : ""}
        >
          Relevance
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
