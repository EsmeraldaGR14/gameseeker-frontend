import React from "react";
import BoxArt from "../../BoxArt/BoxArt";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../utilities/common/Spinner/Spinner";
import ScrollButton from "../../../utilities/common/ScrollButton/ScrollButton";

const CatalogGames = ({ loading, currentGames }) => {
  let navigate = useNavigate();

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container">
      <div className="grid-container">
        {currentGames.map(({ id, title, boxart }) => (
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

      {/* <div className="button-container">
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
      </div> */}

      <ScrollButton />
    </div>
  );
};

export default CatalogGames;
