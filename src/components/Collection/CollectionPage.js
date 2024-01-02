/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import { getGameCollection } from "../../utilities/Api/Collection";
import "./collection.css";
import BoxArt from "../BoxArt/BoxArt";
import { Link } from "react-router-dom";
import ScrollButton from "../../utilities/common/ScrollButton/ScrollButton";
import { extractYear } from "../../utilities/helpers/extractYear";

function Collection() {
  const { user } = useUser();
  const [game, setGame] = useState([]);

  useEffect(() => {
    getCollectionById();
  }, []);

  async function getCollectionById() {
    try {
      let result = await getGameCollection(user.id);
      setGame(result.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <h1>Collection</h1>
      <div className="container">
        <div className="collection-container">
          {game.map(({ id, title, boxart, release_date }) => (
            <Link key={id} to={`/games/${id}`} className="boxart-container">
              <BoxArt
                image={boxart}
                name={title}
                year={extractYear(release_date)}
                gameId={id}
              />
            </Link>
          ))}
        </div>
      </div>
      <ScrollButton />
    </>
  );
}

export default Collection;
