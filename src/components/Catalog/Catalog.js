import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getXGamesAtATime, getAllGames } from "../../utilities/Api/Games";
import BoxArt from "../BoxArt/BoxArt";
import Spinner from "../../utilities/common/Spinner/Spinner";
import "./Catalog.css";

/*
 ** filters
 */

function Catalog() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allGamesLength, setAllGamesLength] = useState(0);
  const [limitAndOffset, setLimitAndOffset] = useState({
    limit: 25,
    offset: 0,
  });

  let navigate = useNavigate();

  useEffect(() => {
    (async function fetchAllGames() {
      try {
        let response = await getAllGames();
        setAllGamesLength(response.length);
        // console.log("allGamesLength:", response.length);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // useEffect(() => {
  //   (async function getAllGamesForTheCatalog() {
  //     try {
  //       let response = await getXGamesAtATime(limitAndOffset);

  //       // console.log(
  //       //   "limitAndOffset:",
  //       //   limitAndOffset.offset
  //       // );
  //       console.log(response.length);
  //       setGames(response);
  //       setLoading(true);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, [limitAndOffset]);

  useEffect(() => {
    const getAllGamesForTheCatalog = async () => {
      try {
        // Simulate a loading state with a delay of 3 seconds
        setLoading(true);
        setTimeout(async () => {
          let response = await getXGamesAtATime(limitAndOffset);
          console.log(response.length);
          setGames(response);
          setLoading(false);
        }, 2000); // 3000 milliseconds (3 seconds)
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getAllGamesForTheCatalog();
  }, [limitAndOffset]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="container">
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
  );
}

export default Catalog;
