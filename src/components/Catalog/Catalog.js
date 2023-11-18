import React, { useEffect, useState } from "react";
import { getXGamesAtATime } from "../../utilities/Api/Games";

/*
 ** should show a range of 25 games in a page
 ** NEXT button
 ** filters
 */

function Catalog() {
  // I want to make it so that if a user presses next the page will refresh and show the next 25 games and so on and so forth.
  const [limitAndOffset, setLimitAndOffset] = useState({
    limit: 25,
    offset: 0,
  });
  useEffect(() => {
    (async function getAllGamesForTheCatalog() {
      try {
        let response = await getXGamesAtATime({ limit: 25, offset: 0 });

        console.log(
          "getAllGamesForTheCatalog:",
          response.length,
          response,
          limitAndOffset
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, [limitAndOffset]);

  return <div></div>;
}

export default Catalog;
