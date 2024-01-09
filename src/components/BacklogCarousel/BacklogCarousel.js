import React from "react";
import GenericCarousel from "../Carousel/Carousel";
import { useUser } from "../UserContext";
// import { getGameBacklog } from "../../utilities/Api/Backlog";

function BacklogCarousel({ openModal }) {
  const { backlog } = useUser();
  // const [backlogData, setBacklogData] = useState([]);

  // const getBacklogById = useCallback(async () => {
  //   try {
  //     let result = await getGameBacklog(user.id);
  //     setBacklogData(result.data);
  //     console.log(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [user.id]);

  // useEffect(() => {
  //   getBacklogById();
  // }, [getBacklogById]);

  return (
    <GenericCarousel
      label="Backlog"
      items={backlog}
      openModal={openModal}
    />
  );
}

export default BacklogCarousel;
