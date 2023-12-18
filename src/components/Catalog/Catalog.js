import React, { useEffect, useState } from "react";
import { getAllGames } from "../../utilities/Api/Games";
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
  const [gamesPerPage] = useState(25);

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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      />
    </>
  );
}

export default Catalog;
