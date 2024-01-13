/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import { getGameCollection } from "../../utilities/Api/Collection";
import "./collection.css";
import BoxArt from "../BoxArt/BoxArt";
import { Link } from "react-router-dom";
import ScrollButton from "../../utilities/common/ScrollButton/ScrollButton";
import { extractYear } from "../../utilities/helpers/extractYear";
import SortingButtons from "../../utilities/common/SortingButtons/SortingButtons";

function Collection() {
  const { user, userCollection} = useUser();
  const [games, setGames] = useState([]);

  useEffect(() => {
    getCollectionById();
  }, [userCollection]);

  async function getCollectionById() {
    try {
      let result = await getGameCollection(user.id);
      setGames(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="container">
        <SortingButtons
          games={games}
          setSortedGames={setGames}
        />
        <h1>Collection</h1>
        <h2>
          {games?.length > 0
            ? `You have ${games?.length} game(s) in your collection.`
            : "Add games to your collection!"}
        </h2>
        <div className="collection-container">
          {games?.map(({ id, title, boxart, release_date }) => (
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
