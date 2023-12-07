import Axios from "./Axios";

async function getGameWishlist(userId) {
  try {
    const response = await Axios.get(`/wishlist/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist", error);
    throw new Error("Error fetching wishlist. Please try again later.");
  }
}

async function addGameToWishlist(userId, gameId) {
  try {
    const response = await Axios.post(`/wishlist/${userId}/${gameId}`);
    return response.data;
  } catch (error) {
    console.error("Error adding game to wishlist", error);
    throw new Error("Error adding game to wishlist. Please try again later.");
  }
}

async function deleteGameFromWishlist(userId, gameId) {
  try {
    const response = await Axios.delete(`/wishlist/${userId}/${gameId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting game from wishlist", error);
    throw new Error(
      "Error deleting game from wishlist. Please try again later."
    );
  }
}

export { getGameWishlist, addGameToWishlist, deleteGameFromWishlist };
