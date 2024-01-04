import React, { useState } from "react";
import LatestGamesCarousel from "../LatestGames/LatestGames";
import BacklogCarousel from "../BacklogCarousel/BacklogCarousel";
import CollectionCarousel from "../CollectionCarousel/CollectionCarousel";
import "./Home.css"
import ScrollButton from "../../utilities/common/ScrollButton/ScrollButton";
import Modal from "../../utilities/common/Modal/Modal";
import Hero from "../Font-assets/pexels-photo-3945683.jpeg";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  
  return (
    <div className="homepage">
      <div className="hero-image">
        <img
          src={Hero}
          alt="Hero"
        />
      </div>
      <div className="welcome-message">
        <h1>Discover. Play. Repeat.</h1>
        <p>
          Explore the latest games, manage your collection, and track your
          gaming backlog.
        </p>
      </div>

      <section>
        <h2>Latest Games</h2>
        <LatestGamesCarousel openModal={openModal} />
      </section>

      <section>
        <h2>Collection</h2>
        <CollectionCarousel openModal={openModal} />
      </section>

      <section>
        <h2>Backlog</h2>
        <BacklogCarousel openModal={openModal} />
      </section>
      <ScrollButton />
      {/* <div className="modal-container-id"> */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title="Cannot add to list"
          message="If you want to use this feature please sign up for an account."
          type={"error"}
          onClose={closeModal}
        />
      )}
      {/* </div> */}
    </div>
  );
}

export default Home;
