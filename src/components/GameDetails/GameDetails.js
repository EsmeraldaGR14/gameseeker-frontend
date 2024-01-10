/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGameById } from "../../utilities/Api/Games";
import Platform from "./Platform";
import Genre from "./Genre";
import Publisher from "./Publisher";
import PlaystationLogo from "../Font-assets/icons8-playstation-logo-48.png";
import XboxLogo from "../Font-assets/icons8-xbox-48.png";
//import SteamLogo from "../Font-assets/icons8-steam-48.png";
import "./game.css";
import { addGameToCollection } from "../../utilities/Api/Collection";
import { addGameToBacklog } from "../../utilities/Api/Backlog";
import { addGameToWishlist } from "../../utilities/Api/Wishlist";
import { useUser } from "../UserContext";
import BoxArt from "../BoxArt/BoxArt";
import { extractYear } from "../../utilities/helpers/extractYear";

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState([]);
  const { user } = useUser();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchGameById();
  }, [id]);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  async function fetchGameById() {
    try {
      let result = await getGameById(id);
      console.log("this is result:", result);
      setGame(result[0]);
      console.log(game.id)
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddToCollection = async () => {
    try {
      await addGameToCollection(user.id, id);
      setSuccess("Game successfully added to collection!");
    } catch (error) {
      console.error("Error adding game to collection:", error);
      setError("Game not added to collection.");
    }
  };

  async function handleAddToBacklog() {
    try {
      await addGameToBacklog(user.id, id);
      setSuccess("Game successfully added to backlog!");
    } catch (error) {
      console.error("Error adding game to backlog:", error);
      setError("Game not added to backlog.");
    }
  }

  async function handleAddToWishlist() {
    try {
      await addGameToWishlist(user.id, id);
      setSuccess("Game successfully added to wishlist!");
    } catch (error) {
      console.error("Error adding game to wishlist:", error);
      setError("Game not added to wishlist.");
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess("");
      setError("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [success, error]);

  return (
    <>
      <div className="container">
        <div className="game-container">
          <div className="game-details-boxart">
            <BoxArt
              className="boxart"
              image={game.boxart}
              name={game.title}
              year={extractYear(game.release_date)}
              openModal={openModal}
              gameId={game.id}
            />
            {/* <div>
            <input type="checkbox" id="completed" name="completed" />
            <label htmlFor="completed">Completed</label>
            <input type="checkbox" id="abandoned" name="abandoned" />
            <label htmlFor="abandoned">Abandoned</label>
          </div> */}
          </div>
          <div className="game-details-title">
            <h1>{game.title}</h1>
            {game.publishers && <Publisher publisher={game.publishers} />}
            <p>
              <strong>{game.esrb}</strong>
            </p>
            {game.platforms && <Platform platform={game.platforms} />}
            {game.genres && <Genre genre={game.genres} />}
            <p>
              <strong>About:</strong> {game.description}
            </p>
          </div>
          <div className="game-details-subscription">
            <article>
              <h2>Play Now</h2>
              <section className="filter">
                <p>
                  <span>Stream</span>
                </p>
                <img src={PlaystationLogo} alt="logo" />
                <img src={XboxLogo} alt="logo" />
              </section>
              <div className="single-page-button">
                <button onClick={handleAddToCollection}>
                  Add to collection
                </button>
                <button onClick={handleAddToBacklog}>Add to backlog</button>
                <button onClick={handleAddToWishlist}>Add to wishlist</button>
                {success && <p className="success-message">{success}</p>}

                {error && <p className="error-message">{error}</p>}
              </div>
            </article>

            {/* <div className="rating-circle">
            <p>{game.rating}</p>
          </div> */}
          </div>
        </div>
        {/* {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            title="Cannot add to list"
            message="If you want to use this feature please sign up for an account."
            type={"error"}
            onClose={closeModal}
          />
        )} */}
      </div>
    </>
  );
}

export default GameDetails;
