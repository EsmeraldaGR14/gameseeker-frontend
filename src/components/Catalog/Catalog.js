import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getXGamesAtATime, getAllGames } from "../../utilities/Api/Games";
import BoxArt from "../BoxArt/BoxArt";
import Spinner from "../../utilities/common/Spinner/Spinner";
import "./Catalog.css";
import ScrollButton from "../../utilities/common/ScrollButton/ScrollButton";

/*
 FILTERS


 */

function Catalog() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allGamesLength, setAllGamesLength] = useState([]);
  const [limitAndOffset, setLimitAndOffset] = useState({
    limit: 25,
    offset: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);

  let navigate = useNavigate();

  useEffect(() => {
    (async function fetchAllGames() {
      try {
        let response = await getAllGames();
        setAllGamesLength(response);
        // console.log("allGamesLength:", response.length);
      } catch (error) {
        console.log(error);
        return error;
      }
    })();
  }, []);

  useEffect(() => {
    const getAllGamesForTheCatalog = async () => {
      try {
        setLoading(true);
        setTimeout(async () => {
          let response = await getXGamesAtATime(limitAndOffset);
          setGames(response);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getAllGamesForTheCatalog();
  }, [limitAndOffset]);

  const indexOfLastGame = currentPage * limitAndOffset.limit;
  const indexOfFirstGame = indexOfLastGame - limitAndOffset.limit;
  const currentGames = allGamesLength.slice(indexOfFirstGame, indexOfLastGame);

  console.log("this is current games", currentGames, allGamesLength.length);

  return loading ? (
    <Spinner />
  ) : (
    <div className="container">
      <h1>Catalog</h1>
      <p>
        Explore our Game Catalog for a world of gaming delights! Whether you're
        a seasoned gamer or new to the scene, find thrilling adventures and
        captivating narratives tailored to your preferences. From action-packed
        blockbusters to indie gems, our curated selection has something for
        everyone. Start your gaming journey now!
      </p>

      <div className="grid-container">
        {games.map(({ id, title, boxart }) => (
          <div
            key={id}
            className="boxart-container"
            onClick={() => {
              navigate(`/games/${id}`);
            }}
          >
            <BoxArt image={boxart} name={title} />
          </div>
        ))}
      </div>

      <div className="button-container">
        {limitAndOffset.offset > 0 && (
          <button
            onClick={() => {
              let newOffset = limitAndOffset.offset - 25;
              setLimitAndOffset((prevState) => ({
                ...prevState,
                offset: newOffset,
              }));
              window.scrollTo({
                top: 100,
                behavior: "smooth",
              });
            }}
          >
            BACK
          </button>
        )}

        {games.length > 0 &&
          allGamesLength - limitAndOffset.offset > limitAndOffset.limit && (
            <button
              onClick={() => {
                let newOffset = limitAndOffset.offset + 25;
                setLimitAndOffset((prevState) => ({
                  ...prevState,
                  offset: newOffset,
                }));
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              NEXT
            </button>
          )}
      </div>

      <ScrollButton />
    </div>
  );
}

export default Catalog;
