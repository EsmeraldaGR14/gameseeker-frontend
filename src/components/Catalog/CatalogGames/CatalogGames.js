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

      <ScrollButton />
    </div>
  );
};

export default CatalogGames;
