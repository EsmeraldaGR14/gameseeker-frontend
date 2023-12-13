import Axios from "./Axios";

async function getGameBacklog(userId) {
  try {
    const response = await Axios.get(`/backlog/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching backlog", error);
    throw new Error("Error fetching backlog. Please try again later.");
  }
}

async function addGameToBacklog(userId, gameId) {
  try {
    const response = await Axios.post(`/backlog/${userId}/${gameId}`);
    return response.data;
  } catch (error) {
    console.error("Error adding game to backlog", error);
    throw new Error("Error adding game to backlog. Please try again later.");
  }
}

async function deleteGameFromBacklog(userId, gameId) {
  try {
    const response = await Axios.delete(`/backlog/${userId}/${gameId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting game from backlog", error);
    throw new Error(
      "Error deleting game from backlog. Please try again later."
    );
  }
}

export { getGameBacklog, addGameToBacklog, deleteGameFromBacklog };
