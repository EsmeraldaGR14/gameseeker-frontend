import React, { useEffect, useState, useCallback } from "react";
import GenericCarousel from "../Carousel/Carousel";
import { useUser } from "../UserContext";
import { getGameCollection } from "../../utilities/Api/Collection";

function CollectionCarousel({ openModal }) {
  // const { userCollection } = useUser();
  const { user } = useUser();
  const [collectionData, setCollectionData] = useState([]);

  const getCollectionById = useCallback(async () => {
    try {
      let result = await getGameCollection(user.id);
      setCollectionData(result.data);
    } catch (error) {
      console.log(error);
    }
  }, [user.id]);

  useEffect(() => {
    getCollectionById();
  }, [getCollectionById]);

  return (
    <GenericCarousel
      label="Collection"
      items={collectionData}
      openModal={openModal}
    />
  );
}

export default CollectionCarousel;
