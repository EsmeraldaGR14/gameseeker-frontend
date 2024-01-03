import React, { useState } from "react";
import LatestGamesCarousel from "../LatestGames/LatestGames";
import BacklogCarousel from "../BacklogCarousel/BacklogCarousel";
import CollectionCarousel from "../CollectionCarousel/CollectionCarousel";
import "./Home.css"
import ScrollButton from "../../utilities/common/ScrollButton/ScrollButton";
import Modal from "../../utilities/common/Modal/Modal";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);

    // Scroll to the top of the modal when it opens
    // const modalElement = document.querySelector(".modal-container-id");
    // if (modalElement) {
    //   modalElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
    // }
  };
  const closeModal = () => setIsModalOpen(false);
  
  return (
    <div className="homepage">
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
