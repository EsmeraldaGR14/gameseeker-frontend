import Axios from "./Axios";

async function getAllGames() {
  try {
    const response = await Axios.get(
      "https://gameseeker-2.onrender.com/games/games"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching games by title:", error);
    throw error;
  }
}

const extractYear = (dateString) => {
  const date = new Date(dateString);
  return date.getFullYear();
};

export { getAllGames, extractYear };
