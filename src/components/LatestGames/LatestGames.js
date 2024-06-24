import React, { useEffect, useState } from "react";
import GenericCarousel from "../Carousel/Carousel";
import { getAllGames } from "../../utilities/Api/Games";

function LatestGamesCarousel({ openModal }) {
  const [latestGames, setLatestGames] = useState([]);

  useEffect(() => {
    const fetchLatestGames = async () => {
      try {
        const response = await getAllGames();

        const filteredGames = response.filter(
          (game) => game.release_date !== null
        );

        const sortedGames = filteredGames.sort((a, b) => {
          const dateA = new Date(a.release_date);
          const dateB = new Date(b.release_date);
          return dateB - dateA;
        });

        const latestGames = sortedGames.slice(0, 10);

        setLatestGames(latestGames);
        // console.log(latestGames);
      } catch (error) {
        console.error("Error fetching latest games:", error);
      }
    };

    fetchLatestGames();
  }, []);

  return <GenericCarousel items={latestGames} openModal={openModal} />;
}

export default LatestGamesCarousel;
