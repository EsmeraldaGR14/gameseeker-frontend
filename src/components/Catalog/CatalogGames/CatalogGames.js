import React from "react";
import BoxArt from "../../BoxArt/BoxArt";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../utilities/common/Spinner/Spinner";
import ScrollButton from "../../../utilities/common/ScrollButton/ScrollButton";
import { extractYear } from "../../../utilities/helpers/extractYear";

const CatalogGames = ({ loading, currentGames }) => {
  let navigate = useNavigate();

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="grid-container">
        {currentGames.map(({ id, title, boxart, release_date }) => (
          <div
            key={id}
            className="boxart-container"
            onClick={() => {
              navigate(`/games/${id}`);
            }}
          >
            <BoxArt
              image={boxart}
              name={title}
              year={extractYear(release_date)}
              gameId={id}
            />
          </div>
        ))}
      </div>

      <ScrollButton />
    </>
  );
};

export default CatalogGames;
