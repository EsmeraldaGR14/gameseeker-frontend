import React, {useEffect, useState} from 'react';
import GenericCarousel from '../Carousel/Carousel';
//import {getLatestGamesAPI} 

function LastestGamesCarousel() {
const [latestGames, setLatestGames] = useState([]);

useEffect(() => {
    const fetchLatestGames = async () => {
        try {
            const response = await getLatestGamesAPI();
            setLatestGames(response.data);

        }catch (error) {
            console.error("Error fetching latest games:", error);
        }
    };
    fetchLatestGames();
}, []);

  return <GenericCarousel items={latestGames}/>
  
}

export default LastestGamesCarousel;