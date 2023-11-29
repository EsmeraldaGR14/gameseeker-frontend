/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGameById } from "../../utilities/Api/Games";
import Platform from "./Platform";
import Genre from "./Genre";
import Publisher from "./Publisher";
import "./game.css";
import { addGameToCollection } from "../../utilities/Api/Collection"
import { useUser } from "../UserContext"

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState([]);
  const { user } = useUser();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("")

  useEffect(() => {
    fetchGameById();
  }, []);

  async function fetchGameById() {
    try {
      let result = await getGameById(id);
      console.log("this is result:", result);
      setGame(result[0]);
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

   useEffect(() => {
     const timer = setTimeout(() => {
       setSuccess("");
       setError("");
     }, 5000);

     return () => clearTimeout(timer);
   }, [success, error]);

  return (
    <>
      <div className="game-container">
        <div className="game-details-boxart">
          <img src={game.boxart} alt="boxart" />
          <div>
            <input type="checkbox" id="completed" name="completed" />
            <label htmlFor="completed">Completed</label>
            <input type="checkbox" id="abandoned" name="abandoned" />
            <label htmlFor="abandoned">Abandoned</label>
          </div>

          <div>
            <button
              onClick={() => console.log("I've been added to the backlog")}
            >
              Add to backlog
            </button>
            <button onClick={handleAddToCollection}>Add to collection</button>
            {success && <p className="success-message">{success}</p>}

            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
        <div className="game-details-title">
          <h1>{game.title}</h1>
          {game.publishers && <Publisher publisher={game.publishers} />}
          <p>{game.esrb}</p>
          {game.platforms && <Platform platform={game.platforms} />}
          {game.genres && <Genre genre={game.genres} />}
          <p>About: {game.description}</p>
        </div>
        <div className="game-details-subscription">
          <article>
            <h2>Play Now</h2>
            <section className="filter">
              <div>Filter</div>
              <p>
                <span>Stream</span> {game.subscription}
              </p>
            </section>
          </article>

          <div className="rating-circle">
            <p>{game.rating}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameDetails;
