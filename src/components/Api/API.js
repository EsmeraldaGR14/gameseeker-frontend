import Axios from "./Axios";

async function getGamesByTitle(title) {
  try {
    const result = await Axios.get("/search", { params: { title } });
    return result;
  } catch (e) {
    return e;
  }
}

async function getCovers() {
  try {
    const result = await Axios.get("/fetchCovers");
    return result;
  } catch (e) {
    return e;
  }
}

export { getGamesByTitle, getCovers };