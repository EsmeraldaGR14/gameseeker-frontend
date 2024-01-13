/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
//import { useParams } from "react-router-dom";
import { useUser } from "../UserContext";
import { getGameBacklog } from "../../utilities/Api/Backlog";
import "./backlog.css";
import BoxArt from "../BoxArt/BoxArt";
import { Link } from "react-router-dom";
import ScrollButton from "../../utilities/common/ScrollButton/ScrollButton";
import { extractYear } from "../../utilities/helpers/extractYear";
import SortingButtons from "../../utilities/common/SortingButtons/SortingButtons";

function Backlog() {
  const { user, backlog } = useUser();
  const [games, setGames] = useState([]);

  useEffect(() => {
    getBacklogById();
  }, [backlog]);

  async function getBacklogById() {
    try {
      let result = await getGameBacklog(user.id);
      setGames(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="container">
        <SortingButtons games={games} setSortedGames={setGames} />
        <h1>Backlog</h1>
        <h2>
          {games.length > 0
            ? `You have ${games.length} game(s) in your backlog.`
            : "Add games to your backlog!"}
        </h2>
        <div className="backlog-container">
          {games.map(({ id, title, boxart, release_date }) => (
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

export default Backlog;
