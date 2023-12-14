import React, { useEffect, useState, useCallback} from "react";
import GenericCarousel from "../Carousel/Carousel";
import { useUser } from "../UserContext";
import { getGameBacklog } from "../../utilities/Api/Backlog";

function BacklogCarousel() {
  const { user } = useUser();
  const [backlogData, setBacklogData] = useState([]);

  const getBacklogById = useCallback(async () => {
    try {
      let result = await getGameBacklog(user.id);
      setBacklogData(result.data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }, [user.id]);

  useEffect(() => {
    getBacklogById();
  }, [getBacklogById]);

  return <GenericCarousel label="Backlog" items={backlogData} />;
}

export default BacklogCarousel;
