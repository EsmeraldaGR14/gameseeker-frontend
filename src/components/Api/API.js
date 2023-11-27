import Axios from "./Axios";


async function getGameById(id) {
  try {
    let result = await Axios.get(`/games/${id}`);

    return result;
  } catch (e) {
    return e;
  }
}

export { getGameById}