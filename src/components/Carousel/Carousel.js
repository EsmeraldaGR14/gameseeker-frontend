import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BoxArt from "../BoxArt/BoxArt";

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
      autoPlay={false}
      autoPlaySpeed={3000}
      infinite={true}
    >
      {(items || []).map((item)=>(
        <React.Fragment key={item.id}>
         <BoxArt image={item.boxart} name={item.title}/>
        </React.Fragment>
      ))}
    </Carousel>
  );
}

export default GenericCarousel;