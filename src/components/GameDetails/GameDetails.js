import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGameById } from "../Api/API";
import Platform from "./Platform";
import Genre from "./Genre";
import Publisher from "./Publisher";
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
  function practice() {
    let platform = game.platforms;
    let string = " ";
    for (let i = 0; i < platform.length; i++) {
      const element = platform[i];
      if (i === platform.length - 1) {
        string += element;
      } else string += element + ", ";
    }
    return { string };
  }

  return (
    <>
      <div className="game-container">
        <div className="game-details-boxart">
          <img src={game.boxart} />
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
            <button
              onClick={() => console.log("I've been added to the collection")}
            >
              Add to collection
            </button>
          </div>
        </div>
        <div className="game-details-title">
          <h1>{game.title}</h1>
          {game.publishers && <Publisher publisher={game.publishers}/>}
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
