import React from "react";
import Carousel from "react-multi-carousel";
import "./Screenshots.css"

function Screenshots({ gameScreenshots, boxart}) {
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

    const screenshots = Array.isArray(gameScreenshots)
      ? [...gameScreenshots]
      : [gameScreenshots];

      const removeBoxart = (screenshots) => {
        if (screenshots) {
          const filteredScreenshots = screenshots.filter(
            (screenshot) => screenshot !== boxart
          );
          return [...filteredScreenshots];
        } else {
          return screenshots;
        }
      };

      const filteredScreenshots = removeBoxart(screenshots);

      if (filteredScreenshots.length === 0) {
        return null;
      }
  
  return (
    <>
      <h3>Screenshots</h3>
      <Carousel
        responsive={responsive}
        autoPlay={3000}
        autoPlaySpeed={3000}
        infinite={true}
      >
        {filteredScreenshots.map((screenshot, index) => (
          <div
            className="screenshots"
            key={index}
            onClick={() => window.open(screenshot, "_blank")}
          >
            <img
              className="screenshot"
              src={screenshot}
              alt={`Screenshot ${index + 1}`}
            />
          </div>
        ))}
      </Carousel>
    </>
  );
}

export default Screenshots;