import Axios from "./Axios";

async function getAllGames() {
  try {
    const response = await Axios.get(
      "https://gameseeker-2.onrender.com/games/games"
    );
    console.log("getAllGames");
    return response.data;
  } catch (error) {
    console.log("Error fetching all games:", error);
    throw error;
  }
}

async function getXGamesAtATime({ limit, offset }) {
  try {
    const response = await Axios.get(
      `https://gameseeker-2.onrender.com/games/get-x-games-at-a-time?limit=${limit}&offset=${offset}`
    );
    // console.log("getXGamesAtATime:", response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching x games at a time:", error);
    return error;
  }
}

const extractYear = (dateString) => {
  const date = new Date(dateString);
  return date.getFullYear();
};

export { getAllGames, extractYear, getXGamesAtATime };
