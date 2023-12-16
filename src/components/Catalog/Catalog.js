import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { getAllGames } from "../../utilities/Api/Games";
// import BoxArt from "../BoxArt/BoxArt";
// import Spinner from "../../utilities/common/Spinner/Spinner";
// import ScrollButton from "../../utilities/common/ScrollButton/ScrollButton";
import CatalogGames from "./CatalogGames/CatalogGames";
import CatalogPagination from "./CatalogPagination/CatalogPagination";
import "./Catalog.css";

/*
 FILTERS


 */

function Catalog() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // allow users to be able to change how many games they can see in a page
  const [gamesPerPage] = useState(5);
  const [totalAmountOfPageNumbers, setTotalAmountOfPageNumbers] = useState(0);

  // const [allGamesLength, setAllGamesLength] = useState([]);
  // const [limitAndOffset, setLimitAndOffset] = useState({
  //   limit: 25,
  //   offset: 0,
  // });

  // useEffect(() => {
  //   (async function fetchAllGames() {
  //     try {
  //       let response = await getAllGames();
  //       setAllGamesLength(response);
  //       // console.log("allGamesLength:", response.length);
  //     } catch (error) {
  //       console.log(error);
  //       return error;
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    const getAllGamesForTheCatalog = async () => {
      try {
        setLoading(true);
        setTimeout(async () => {
          let response = await getAllGames();
          setGames(response);
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getAllGamesForTheCatalog();
  }, []);

  // get currentGames
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  console.log("currentGames:", currentGames);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log(paginate);

  return (
    <>
      <h1>Catalog</h1>
      <p>
        Explore our Game Catalog for a world of gaming delights! Whether you're
        a seasoned gamer or new to the scene, find thrilling adventures and
        captivating narratives tailored to your preferences. From action-packed
        blockbusters to indie gems, our curated selection has something for
        everyone. Start your gaming journey now!
      </p>
      {/* filters */}
      <div>
        <button>FILTERS</button>
      </div>
      <CatalogGames loading={loading} currentGames={currentGames} />
      <CatalogPagination
        gamesPerPage={gamesPerPage}
        games={games.length}
        paginate={paginate}
        totalAmountOfPageNumbers={setTotalAmountOfPageNumbers}
      />

      {/* buttons */}

      <div>
        <button>Previous</button>
        <p> page </p>
        <input></input>
        <label>GO</label>
        <p> of {totalAmountOfPageNumbers}</p>
        <button>Next</button>
      </div>
    </>
  );
  // (
  //   <div className="container">
  //     <h1>Catalog</h1>
  //     <p>
  //       Explore our Game Catalog for a world of gaming delights! Whether you're
  //       a seasoned gamer or new to the scene, find thrilling adventures and
  //       captivating narratives tailored to your preferences. From action-packed
  //       blockbusters to indie gems, our curated selection has something for
  //       everyone. Start your gaming journey now!
  //     </p>

  //     <div className="grid-container">
  //       {games.map(({ id, title, boxart }) => (
  //         <div
  //           key={id}
  //           className="boxart-container"
  //           onClick={() => {
  //             // navigate(`/games/${id}`);
  //           }}
  //         >
  //           <BoxArt image={boxart} name={title} />
  //         </div>
  //       ))}
  //     </div>

  //     {/* <div className="button-container">
  //       {limitAndOffset.offset > 0 && (
  //         <button
  //           onClick={() => {
  //             let newOffset = limitAndOffset.offset - 25;
  //             setLimitAndOffset((prevState) => ({
  //               ...prevState,
  //               offset: newOffset,
  //             }));
  //             window.scrollTo({
  //               top: 100,
  //               behavior: "smooth",
  //             });
  //           }}
  //         >
  //           BACK
  //         </button>
  //       )}

  //       {games.length > 0 &&
  //         allGamesLength - limitAndOffset.offset > limitAndOffset.limit && (
  //           <button
  //             onClick={() => {
  //               let newOffset = limitAndOffset.offset + 25;
  //               setLimitAndOffset((prevState) => ({
  //                 ...prevState,
  //                 offset: newOffset,
  //               }));
  //               window.scrollTo({
  //                 top: 0,
  //                 behavior: "smooth",
  //               });
  //             }}
  //           >
  //             NEXT
  //           </button>
  //         )}
  //     </div> */}

  //     <ScrollButton />
  //   </div>
  // );
}

export default Catalog;
