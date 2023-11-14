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
