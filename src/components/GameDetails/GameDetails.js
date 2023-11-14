import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGameById } from "../Api/API";
import "./game.css";

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState([]);

  useEffect(() => {
    fetchGameById();
  }, []);

  async function fetchGameById() {
    try {
      let result = await getGameById(id);
      console.log(result.data[0]);
      setGame(result.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="game-container">
        <div className="game-details-boxart">
          <p>{game.boxart}</p>

          <input type="checkbox" id="completed" name="completed" />
          <label htmlFor="completed">Completed</label>
          <input type="checkbox" id="abandoned" name="abandoned" />
          <label htmlFor="abandoned">Abandoned</label>
          <div>
            <button
              onClick={() => console.log("I've been added to the backlog")}
            >
              Add to backlog
            </button>
            <button
              onClick={() => console.log("I've been added to the collection")}
            >
              Add to collection
            </button>
          </div>
        </div>
        <div className="game-details-title">
          <h1>{game.title}</h1>
          <p>({game.released_year})</p>
          <p>{game.publisher}</p>
          <p>{game.platform}</p>
          <p>{game.genre}</p>
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
