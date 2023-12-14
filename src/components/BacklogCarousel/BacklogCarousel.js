import React, { useEffect, useState } from "react";
import GenericCarousel from "../Carousel/Carousel";
import { useUser } from "../UserContext";
import { getGameBacklog } from "../../utilities/Api/Backlog";

function BacklogCarousel() {
  const { user } = useUser();
  const [backlogData, setBacklogData] = useState([]);

  useEffect(() => {
    getBacklogById();
  }, []);

  async function getBacklogById() {
    try {
      let result = await getGameBacklog(user.id);
      setBacklogData(result.data);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  return <GenericCarousel label="Backlog" items={backlogData} />;
}

export default BacklogCarousel;
