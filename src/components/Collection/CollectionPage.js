/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import { getGameCollection } from "../../utilities/Api/Collection";
import "./collection.css";

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
          {game.map(({ boxart }) => {
            return (
              <div>
                <img src={boxart} alt="boxart" className="boxart-image" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Collection;
