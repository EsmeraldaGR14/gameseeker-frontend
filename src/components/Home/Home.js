import React from "react";
import LatestGamesCarousel from "../LatestGames/LatestGames";
import BacklogCarousel from "../BacklogCarousel/BacklogCarousel";
function Home() {
  return (
    <div className="homepage">
      <LatestGamesCarousel />
      <BacklogCarousel />
    </div>
  );
}

export default Home;
