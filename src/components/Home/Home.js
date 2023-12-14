import React from "react";
import LatestGamesCarousel from "../LatestGames/LatestGames";
import BacklogCarousel from "../BacklogCarousel/BacklogCarousel";
import CollectionCarousel from "../CollectionCarousel/CollectionCarousel";
import "./Home.css"
function Home() {
  return (
    <div className="homepage">
      <div className="welcome-message">
        <h1>Welcome to GameSeeker</h1>
        <p>
          Explore the latest games, manage your collection, and track your
          gaming backlog.
        </p>
      </div>

      <section>
        <h2>Latest Games</h2>
        <LatestGamesCarousel />
      </section>

      <section>
        <h2>Collection</h2>
        <CollectionCarousel />
      </section>

      <section>
        <h2>Backlog</h2>
        <BacklogCarousel />
      </section>
    </div>
  );
}

export default Home;
