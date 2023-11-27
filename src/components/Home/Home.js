import React from 'react'
// eslint-disable-next-line
import GenericCarousel from '../Carousel/Carousel'
import LatestGamesCarousel from '../LatestGames/LatestGames'



function Home() {
  return (

    <div className="homepage">
        <LatestGamesCarousel/>
    </div>
  );
}

export default Home;