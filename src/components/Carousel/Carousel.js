import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BoxArt from "../BoxArt/BoxArt";

function GenericCarousel({ items }) {

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

  console.log(items);
  const itemsArray = Array.isArray(items) ? items : [items];
  return (
    <Carousel
      responsive={responsive}
      autoPlay={false}
      autoPlaySpeed={3000}
      infinite={true}
    >
      {itemsArray.map((item) => {
        const imageUrl = item.boxart;
        return (
          <React.Fragment key={item.id}>
            <BoxArt image={imageUrl} name={item.title} />
          </React.Fragment>
        );
      })}
    </Carousel>
  );
}

export default GenericCarousel;
