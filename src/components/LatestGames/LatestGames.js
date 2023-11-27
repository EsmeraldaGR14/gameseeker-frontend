import React, { useEffect, useState } from "react";
import GenericCarousel from "../Carousel/Carousel";
import { getLatestGamesAPI } from "../../utilities/Api/Games";

function LatestGamesCarousel() {
  const [latestGames, setLatestGames] = useState([]);

  useEffect(() => {
    const fetchLatestGames = async () => {
      try {
        const response = await getLatestGamesAPI();

        setLatestGames(response);
      } catch (error) {
        console.error("Error fetching latest games:", error);
      }
    };
    fetchLatestGames();
  }, []);
  console.log(latestGames);

  return <GenericCarousel items={latestGames} />;
}

export default LatestGamesCarousel;
