/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { useParams } from "react-router-dom";
import { useUser } from "../UserContext";
import { getGameBacklog } from "../../utilities/Api/Backlog";
import "./backlog.css";

function Backlog() {
  const { user } = useUser();
  const [game, setGame] = useState([]);
  // const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    getBacklogById();
  }, []);

  async function getBacklogById() {
    try {
      let result = await getGameBacklog(user.id);
      setGame(result.data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Backlog</h1>
      <div className="container">
        <div className="backlog-container">
          {game.map(({ boxart, id }) => {
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

export default Backlog;
