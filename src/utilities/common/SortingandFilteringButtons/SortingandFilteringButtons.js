// import React, {useState, useEffect} from 'react';
// import { getAllGames } from '../../Api/Games';
// import { extractYear } from '../../helpers/extractYear';

// function SortingandFilteringButtons({ ids }) {
//     const [sortCriteria, setSortCriteria] = useState("relevance");
//     const [selectedSortCriteria, setSelectedSortCriteria] = useState("relevance");

//     const handleSort = async (query) => {
//       try {
//         const allGames = await getAllGames();
//         const filteredGames = allGames.filter((game) =>
//           game.title.toLowerCase().includes(query.toLowerCase())
//         );
//         if (sortCriteria === "title") {
//           filteredGames.sort((a, b) =>
//             a.title.toLowerCase().localeCompare(b.title.toLowerCase())
//           );
//         } else if (sortCriteria === "releaseDate") {
//           filteredGames.sort((a, b) =>
//             extractYear(a.release_date)
//               .toString()
//               .localeCompare(extractYear(b.release_date).toString())
//           );
//         }
//         setSearchResults(filteredGames || []);
//       } catch (error) {
//         console.error("Error fetching search results:", error);
//         setSearchResults([]);
//       }
//     };
    
//     useEffect(() => {
//     handleSort();
//   }, [sortCriteria]);
  
//     return (
//       <div className="container">
//         <div className="sort-buttons">
//           {/* <button type="button" onClick={() => handleView("list")}>
//           List View
//         </button>
//         <button type="button" onClick={() => handleView("grid")}>
//           Grid View
//         </button> */}
//           <button
//             type="button"
//             onClick={() => handleSort("relevance")}
//             className={selectedSortCriteria === "relevance" ? "selected" : ""}
//           >
//             Relevance
//           </button>
//           <button
//             type="button"
//             onClick={() => handleSort("title")}
//             className={selectedSortCriteria === "title" ? "selected" : ""}
//           >
//             Title
//           </button>
//           <button
//             type="button"
//             onClick={() => handleSort("releaseDate")}
//             className={selectedSortCriteria === "releaseDate" ? "selected" : ""}
//           >
//             Release Date
//           </button>
//           <button
//             type="button"
//             onClick={handleRandomGame}
//             className={"randomGame"}
//           >
//             Random Game
//           </button>
//         </div>
//       </div>
//     );
// }

// export default SortingandFilteringButtons