import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function GenericCarousel({items}) {
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

  return (
    <Carousel
      responsive={responsive}
      autoPlay={true}
      autoPlaySpeed={3000}
      infinite={true}
    >
      {/* {items.map((item)=>(
        <div key={item.id}>
          <img src={item.image} alt={item.name}/>
          <p>{item.name}</p>
        </div>
      ))} */}
    </Carousel>
  );
}

export default GenericCarousel;
