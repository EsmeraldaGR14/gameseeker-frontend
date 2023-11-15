import React, {useEffect,useState} from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getTopXGamesAPI } from "../../utilities/Api/Games";

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
  const [topGames, setTopGames] = useState([]);
 useEffect(() => getTopXGamesAPI());

  // const items = [
  //   <div>
  //     <img
  //       src="https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
  //       alt="Item 1"
  //     />
  //     <p>React Carousel with Server Side Rendering Support – Part 1</p>
  //     <p>w3js.com - web front-end studio</p>
  //   </div>,
  //   <div>
  //     <img
  //       src="https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
  //       alt="Item 2"
  //     />
  //     <p>React Carousel with Server Side Rendering Support – Part 2</p>
  //     <p>w3js.com - web front-end studio</p>
  //   </div>,
  //   <div>
  //     <img
  //       src="https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
  //       alt="Item 1"
  //     />
  //     <p>React Carousel with Server Side Rendering Support – Part 1</p>
  //     <p>w3js.com - web front-end studio</p>
  //   </div>,
  //   <div>
  //     <img
  //       src="https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
  //       alt="Item 1"
  //     />
  //     <p>React Carousel with Server Side Rendering Support – Part 1</p>
  //     <p>w3js.com - web front-end studio</p>
  //   </div>,
  // ];

  return (
    <Carousel
      responsive={responsive}
      autoPlay={true}
      autoPlaySpeed={3000}
      infinite={true}
    >
      {topGames.map(game => (
        <div key={game.id}>
          <img src={game.image} alt ={game.name} />
          <p>{game.name}</p>
        </div>
      ))}  

    </Carousel>
  );
}

export default GenericCarousel;
