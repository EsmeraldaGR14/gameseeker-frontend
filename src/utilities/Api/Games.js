import Axios from "./Axios";

async function getTopXGamesAPI() {
    try {
        let result = await Axios.get("/top-rated-games");
        return result;
    } catch (error) {
        console.log(error);
    }
}



export {
    getTopXGamesAPI,
};

async function getAllGames() {
  try {
    const response = await Axios.get("/games");
    return response.data;
  } catch (error) {
    console.error("Error fetching games by title:", error);
    throw error;
  }
}

export { getAllGames };
