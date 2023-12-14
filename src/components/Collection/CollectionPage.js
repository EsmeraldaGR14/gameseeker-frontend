/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { getGameCollection } from "../../utilities/Api/Collection";
import "./collection.css";

function Collection() {
  const { user } = useUser();
  const [game, setGame] = useState([]);

  let navigate = useNavigate();

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
          {game.map(({ boxart,id }) => {
            return (
              <div
                key={id}
                onClick={() => {
                  navigate(`/games/${id}`);
                }}
              >
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
