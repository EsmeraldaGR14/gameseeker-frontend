import React from "react";
import GenericCarousel from "../Carousel/Carousel";
import { useUser } from "../UserContext";

function CollectionCarousel({ openModal }) {
  const { userCollection } = useUser();
  // const [collectionData, setCollectionData] = useState([]);

  // const getCollectionById = useCallback(async () => {
  //   try {
  //     let result = await getGameCollection(user.id);
  //     setCollectionData(result.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [user.id]);

  // useEffect(() => {
  //   getCollectionById();
  // }, [getCollectionById]);

  return (
    <GenericCarousel
      label="Collection"
      items={userCollection}
      openModal={openModal}
    />
  );
}

export default CollectionCarousel;
