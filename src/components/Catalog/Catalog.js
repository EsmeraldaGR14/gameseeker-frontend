import React, { useEffect, useState } from "react";
import { getAllGames } from "../../utilities/Api/Games";
import CatalogGames from "./CatalogGames/CatalogGames";
import CatalogPagination from "./CatalogPagination/CatalogPagination";
import "./Catalog.css";

/*
 FILTERS

 * genre
 * rating input by user 
 * rating asc/desc
 * platforms
 * realsed
 * asc/desc title

 */

function Catalog() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(25);
  const [showFilters, setShowFilters] = useState(false);

  const filters = ["Genre", "Realeased Date", "Platform", "Title"];

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

  const filterTheGames = (e) => {
    console.log(e.target.value);
    // setFilter()
  };

  function showAllFilters() {
    console.log("before", showFilters);

    setShowFilters(!showFilters);
    console.log("after", showFilters);
  }

  // get currentGames
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="catalog">
      <div className="container">
        <h1>Catalog</h1>
        <p>
          Explore our Game Catalog for a world of gaming delights! Whether
          you're a seasoned gamer or new to the scene, find thrilling adventures
          and captivating narratives tailored to your preferences. From
          action-packed blockbusters to indie gems, our curated selection has
          something for everyone. Start your gaming journey now!
        </p>
        {/* filters */}
        <div>
          <button className="show-all-filters" onClick={showAllFilters}>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          <div className="filters">
            {showFilters &&
              filters.map((filter) => (
                <button
                  key={filter}
                  value={filter}
                  onClick={(e) => filterTheGames(e)}
                >
                  {filter}
                </button>
              ))}
          </div>
        </div>
        <CatalogGames loading={loading} currentGames={currentGames} />
        <CatalogPagination
          gamesPerPage={gamesPerPage}
          games={games.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default Catalog;
