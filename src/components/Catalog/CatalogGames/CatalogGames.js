import React from "react";
import BoxArt from "../../BoxArt/BoxArt";
import { Link } from "react-router-dom";
import Spinner from "../../../utilities/common/Spinner/Spinner";
import ScrollButton from "../../../utilities/common/ScrollButton/ScrollButton";
import { extractYear } from "../../../utilities/helpers/extractYear";

const CatalogGames = ({ loading, currentGames, openModal, filteredResults }) => {
  // if (loading) {
  //   return <Spinner />;
  // }

  return (
    <>
      <div className="grid-container">
        {filteredResults.length > 0
            ? filteredResults.map((game) => (
                <Link
                  to={`/games/${game.id}`}
                  className="boxart-container"
                  key={game.id}
                >
                  <BoxArt
                    image={game.boxart}
                    name={game.title}
                    year={extractYear(game.release_date)}
                    gameId={game.id}
                  />
                </Link>
              ))
            : currentGames.map(({ id, title, boxart, release_date }) => (
          <Link key={id} to={`/games/${id}`} className="boxart-container">
            <BoxArt
              image={boxart}
              name={title}
              year={extractYear(release_date)}
              gameId={id}
              openModal={openModal}
              // hoverEnabled={false}
            />
          </Link>
        ))}
      </div>

      <ScrollButton />
    </>
  );
};

export default CatalogGames;
