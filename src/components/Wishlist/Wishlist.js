/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import { getGameWishlist } from "../../utilities/Api/Wishlist";
import "./Wishlist.css";
import BoxArt from "../BoxArt/BoxArt";
import { Link } from "react-router-dom";
import ScrollButton from "../../utilities/common/ScrollButton/ScrollButton";
import { extractYear } from "../../utilities/helpers/extractYear";
import SortingButtons from "../../utilities/common/SortingButtons/SortingButtons";

function Wishlist() {
  const { user, userWishlist } = useUser();
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGameWishlistById();
  }, [userWishlist]);

  async function getGameWishlistById() {
    try {
      let result = await getGameWishlist(user.id);
      setGames(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="container">
        <SortingButtons games={games} setSortedGames={setGames} />
        <h1>Wishlist</h1>
        <h2>
          {games.length > 0
            ? `You have ${games.length} game(s) in your wishlist.`
            : "Add games to your wishlist!"}
        </h2>
        <div className="wishlist-container">
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

export default Wishlist;
