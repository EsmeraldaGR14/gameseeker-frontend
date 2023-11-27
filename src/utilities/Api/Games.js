import Axios from "./Axios";

async function getAllGames() {
  try {
    const response = await Axios.get("/games");
    return response.data;
  } catch (error) {
    console.error("Error fetching games by title:", error);
    throw error;
  }
}

async function getLatestGamesAPI() {
  try {
    const response = await Axios.get("/games/latest-games");
   
    return response.data;

  } catch (error) {
    console.error("Error fetching games by release date:", error);
    throw error;
  } 
}


async function getGameById(id) {
  try {
    let result = await Axios.get(`/games/${id}`);

    return result;
  } catch (e) {
    return e;
  }
}



export { getAllGames, getLatestGamesAPI, getGameById };
