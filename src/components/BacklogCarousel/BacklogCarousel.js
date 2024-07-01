import React, { useEffect, useState, useCallback } from "react";
import GenericCarousel from "../Carousel/Carousel";
import { useUser } from "../UserContext";
import { getGameBacklog } from "../../utilities/Api/Backlog";

function BacklogCarousel({ openModal }) {
  const { user, backlog } = useUser();
  const [backlogData, setBacklogData] = useState([]);

  const getBacklogById = useCallback(async () => {
    try {
      let result = await getGameBacklog(user.id);
      setBacklogData(result.data);
    } catch (error) {
      console.log(error);
    }
  }, [user.id]);

  //When the backlog in the user context is updated by the boxart refetch the updated info
  useEffect(() => {
    getBacklogById();
  }, [backlog]);

  return (
    <GenericCarousel
      label="Backlog"
      items={backlogData}
      openModal={openModal}
    />
  );
}

export default BacklogCarousel;
