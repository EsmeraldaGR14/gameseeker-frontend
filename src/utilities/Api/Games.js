import AxiosInstance from "./Axios";

async function getAllGames() {
  try {
    const response = await AxiosInstance.get("/games");
    console.log("getAllGames");
    return response.data;
  } catch (error) {
    console.log("Error fetching all games:", error);
    throw error;
  }
}

async function getXGamesAtATime({ limit, offset }) {
  try {
    const response = await AxiosInstance.get(
      `/games/get-x-games-at-a-time?limit=${limit}&offset=${offset}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching x games at a time:", error);
    return error;
  }
}

async function getLatestGamesAPI() {
  try {
    const response = await AxiosInstance.get("/games/latest-games");

    return response.data;
  } catch (error) {
    console.error("Error fetching games by release date:", error);
    throw error;
  }
}

async function getGameById(id) {
  try {
    const response = await AxiosInstance.get(`/games/${id}`);

    return response.data;
  } catch (e) {
    return e;
  }
}

export { getAllGames, getLatestGamesAPI, getGameById, getXGamesAtATime };
