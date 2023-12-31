import React, { useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BoxArt from "../BoxArt/BoxArt";
import { extractYear } from "../../utilities/helpers/extractYear";

function GenericCarousel({ items, openModal }) {
  const [isBoxArtHovered, setIsBoxArtHovered] = useState(false);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
  };

  const itemsArray = Array.isArray(items) ? items : [items];
  return (
    <Carousel
      responsive={responsive}
      autoPlay={!isBoxArtHovered}
      autoPlaySpeed={3000}
      infinite={true}
    >
      {itemsArray.map((item) => {
        const imageUrl = item?.boxart;
        const itemID = item?.id;
        const itemTitle = item?.title;
        const itemYear = extractYear(item?.release_date);
        return (
          <React.Fragment key={itemID}>
            <Link to={`/games/${itemID}`}>
              <BoxArt
                image={imageUrl}
                name={itemTitle}
                year={itemYear}
                gameId={itemID}
                openModal={openModal}
                handleHover={() => setIsBoxArtHovered(true)}
                handleHoverLeave={() => setIsBoxArtHovered(false)}
              />
            </Link>
          </React.Fragment>
        );
      })}
    </Carousel>
  );
}

export default GenericCarousel;
