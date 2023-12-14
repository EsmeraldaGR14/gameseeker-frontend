import React from "react";
import LatestGamesCarousel from "../LatestGames/LatestGames";
import BacklogCarousel from "../BacklogCarousel/BacklogCarousel";
function Home() {
  return (
    <div className="homepage">
      <h2>Latest Games</h2>
      <LatestGamesCarousel />
      <h2>Backlog</h2>
      <BacklogCarousel />
    </div>
  );
}

export default Home;
