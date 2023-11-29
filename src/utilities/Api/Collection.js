import Axios from "./Axios";

async function getGameCollection(userId) {
  try {
    const response = await Axios.get(`collection/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching collection", error);
    throw { message: "Error fetching collection. Please try again later." };
  }
}

async function addGameToCollection(userId, gameId) {
  try {
    const response = await Axios.post(`collection/${userId}/${gameId}`);
    return response.data;
  } catch (error) {
    console.error("Error adding game to collection", error);
    throw { message: "Error adding game to collection. Please try again later." };
  }
}

async function deleteGameFromCollection(userId, gameId) {
  try {
    const response = await Axios.delete(`collection/${userId}/${gameId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting game from collection", error);
    throw { message: "Error deleting game from collection. Please try again later." };
  }
}

export { getGameCollection, addGameToCollection, deleteGameFromCollection };