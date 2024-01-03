import React, { useState, useCallback, useEffect } from "react";
import { extractYear } from "../../helpers/extractYear";
import "./SortingandFilteringButtons.css"

const subscriptionServices = [
  "PlayStation Plus Essential",
  "PlayStation Plus Extra",
  "PlayStation Plus Premium",
  "Xbox Game Pass Core",
  "Xbox Game Pass",
  "PC Game Pass",
  "GeForce Now",
  "Nintendo Switch Online",
  "Ubisoft+",
  "Apple Arcade",
];

function SortingandFilteringButtons({ sortedGames, setSortedGames }) {
  // const [sortCriteria, setSortCriteria] = useState("relevance");
  // const [selectedSortCriteria, setSelectedSortCriteria] = useState("relevance");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  // const removeTheFromTitle = (title) => {
  //   const normalizedTitle = title.toLowerCase();
  //   return normalizedTitle.startsWith("the ")
  //     ? normalizedTitle.slice(4)
  //     : normalizedTitle;
  // };

  //  const handleCriteria = (criteria) => {
  //    setSortCriteria(criteria);
  //    setSelectedSortCriteria(criteria);
  //  };

   const toggleDropdown = () => {
     setIsDropdownOpen((prev) => !prev);
   };

   const handleServiceToggle = (service) => {
     const updatedServices = selectedServices.includes(service)
       ? selectedServices.filter((s) => s !== service)
       : [...selectedServices, service];

     setSelectedServices(updatedServices);
     console.log(
       `Checkbox for service "${service}" clicked. Updated services:`,
       updatedServices
     );
    //  console.log(`originalGames ${[originalGames]}`);
     console.log(`Games ${sortedGames}`);
   };


  //  const handleSort = useCallback(() => {
  //    try {
  //      let sortedGames = [...games];

  //     //  if (selectedServices.length > 0) {
  //     //    sortedGames = sortedGames.filter(
  //     //      (game) =>
  //     //        Array.isArray(game.subscription) &&
  //     //        game.subscription.some((sub) => selectedServices.includes(sub))
  //     //    );
  //     //  }

  //      if (sortCriteria === "title") {
  //        console.log("Sorting by title");
  //        sortedGames.sort((a, b) =>
  //          removeTheFromTitle(a.title).localeCompare(
  //            removeTheFromTitle(b.title)
  //          )
  //        );
  //      } else if (sortCriteria === "releaseDate") {
  //        console.log("Sorting by date");
  //        sortedGames.sort((a, b) =>
  //          extractYear(a.release_date)
  //            .toString()
  //            .localeCompare(extractYear(b.release_date).toString())
  //        );
  //      }
  //      setSortedGames(sortedGames);
  //    } catch (error) {
  //      console.error("Error sorting games:", error);
  //    }
  //  }, [games, sortCriteria, setSortedGames]);

   const handleFilter = () => {
     try {
       let filteredGames = [...sortedGames];

       if (selectedServices.length > 0) {
         filteredGames = filteredGames.filter(
           (game) =>
             Array.isArray(game.subscription) &&
             game.subscription.some((sub) => selectedServices.includes(sub))
         );
       } else {
         filteredGames = [...sortedGames];
       }
       setSortedGames(filteredGames);
       console.log(filteredGames);
     } catch (error) {
       console.error("Error filtering games:", error);
     }
   };

  //  useEffect(() => {
  //    handleSort();
  //  }, [sortCriteria]);

   useEffect(() => {
     handleFilter();
   }, [selectedServices]);

  //  useEffect(() => {
  //    setOriginalGames(games);
  //  }, [games]);

  return (
    <div className="container">
      <div className="sort-buttons">
        <button
          type="button"
          // onClick={() => handleCriteria("relevance")}
          // className={selectedSortCriteria === "relevance" ? "selected" : ""}
        >
          Relevance
        </button>
        <button
          type="button"
          // onClick={() => handleCriteria("title")}
          // className={selectedSortCriteria === "title" ? "selected" : ""}
        >
          Title
        </button>
        <button
          type="button"
          // onClick={() => handleCriteria("releaseDate")}
          // className={selectedSortCriteria === "releaseDate" ? "selected" : ""}
        >
          Release Date
        </button>
      </div>
      <div className="subscription-filter">
        <div className="dropdown">
          <div className="dropdown-title" onClick={toggleDropdown}>
            <span>
              {selectedServices.length === 0
                ? "Select Services"
                : selectedServices.join(", ")}
            </span>
            <span className={`arrow ${isDropdownOpen ? "up" : "down"}`}>
              {isDropdownOpen ? "\u25B2" : "\u25BC"}
            </span>
          </div>
          {isDropdownOpen && (
            <div className="dropdown-options">
              {subscriptionServices.map((service) => (
                <div
                  key={service}
                  className="option"
                  onClick={() => handleServiceToggle(service)}
                >
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service)}
                    onChange={() => {}}
                  />
                  {service}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SortingandFilteringButtons;

// UPDATE game
// SET subscription = CASE
//     WHEN id = 4 THEN ARRAY['Xbox Game Pass',
//   'PC Game Pass']
//     WHEN id = 5 THEN ARRAY['Ubisoft+',
//   'Apple Arcade']
//     WHEN id = 6 THEN ARRAY['GeForce Now',
//   'Nintendo Switch Online']
//     WHEN id = 7 THEN ARRAY[ 'Xbox Game Pass',
//   'PC Game Pass']
//     WHEN id = 8 THEN ARRAY['Ubisoft+']
//     WHEN id = 9 THEN ARRAY['Nintendo Switch Online', 'Ubisoft+']
//     WHEN id = 10 THEN ARRAY['Nintendo Switch Online']
//     WHEN id = 11 THEN ARRAY['Nintendo Switch Online', 'Ubisoft+']
//     ELSE ARRAY[]::VARCHAR[]
// END
// WHERE id IN (4, 5, 6, 7, 8, 9, 10, 11);

// 'PlayStation Plus Essential',
//   'PlayStation Plus Extra",
//   "PlayStation Plus Premium",
//   "Xbox Game Pass Core",
//   "Xbox Game Pass",
//   "PC Game Pass",
//   "GeForce Now",
//   "Nintendo Switch Online",
//   "Ubisoft+",
//   "Apple Arcade",
