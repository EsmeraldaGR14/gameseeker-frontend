import React, { useEffect } from "react";
import { getAllGames } from "../../utilities/Api/Games";

/*
 ** should show a range of 35 games in a page
 ** maybe a NEXT button
 ** filters
 */

function Catalog() {
  useEffect(() => {
    (async function getAllGamesForTheCatalog() {
      try {
        let response = await getAllGames();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return <div></div>;
}

export default Catalog;
