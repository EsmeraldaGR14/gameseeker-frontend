import React, { useEffect, useState } from "react";
import { getXGamesAtATime, getAllGames } from "../../utilities/Api/Games";

/*
 ** should show a range of 25 games in a page
 ** NEXT button
 ** filters
 */

function Catalog() {
  // I want to make it so that if a user presses next the page will refresh and show the next 25 games and so on and so forth.

  const [games, setGames] = useState([]);
  const [allGamesLength, setAllGamesLength] = useState(0);
  const [limitAndOffset, setLimitAndOffset] = useState({
    limit: 25,
    offset: 0,
  });
  // const [testing, setTesting] = useState(true);

  useEffect(() => {
    (async function fetchAllGames() {
      try {
        let response = await getAllGames();
        setAllGamesLength(response.length);
        console.log("allGamesLength:", response.length);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async function getAllGamesForTheCatalog() {
      try {
        let response = await getXGamesAtATime(limitAndOffset);

        console.log(
          // "getAllGamesForTheCatalog:",
          // response,
          "limitAndOffset:",
          limitAndOffset.offset
        );
        setGames(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [limitAndOffset]);
  // console.log(games[0]);
  return (
    <div>
      {/* if we are passed the first bunch
       **
       */}
      {limitAndOffset.offset > 0 && (
        <button
          onClick={() => {
            let newOffset = limitAndOffset.offset - 25;
            setLimitAndOffset((prevState) => ({
              ...prevState,
              offset: newOffset,
            }));
          }}
        >
          BACK
        </button>
      )}
      <div>
        {games.map((game) => (
          <div key={game.id}>{game.id}</div>
        ))}
      </div>
      {/* once it reaches the last bunch of the array that can be fetched next button should not show */}
      {games.length > 0 &&
        allGamesLength - limitAndOffset.offset > limitAndOffset.limit && (
          <button
            onClick={() => {
              let newOffset = limitAndOffset.offset + 25;
              setLimitAndOffset((prevState) => ({
                ...prevState,
                offset: newOffset,
              }));
            }}
          >
            NEXT
          </button>
        )}
    </div>
  );
}

export default Catalog;
