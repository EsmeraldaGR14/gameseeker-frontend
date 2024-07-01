import React, { useEffect, useState, useCallback } from "react";
import GenericCarousel from "../Carousel/Carousel";
import { useUser } from "../UserContext";
import { getGameCollection } from "../../utilities/Api/Collection";

function CollectionCarousel({ openModal }) {
  const { user, userCollection } = useUser();
  const [collectionData, setCollectionData] = useState([]);

  const getCollectionById = useCallback(async () => {
    try {
      let result = await getGameCollection(user.id);
      setCollectionData(result.data);
    } catch (error) {
      console.log(error);
    }
  }, [user.id]);

  //When the collection in the user context is updated by the boxart refetch the updated info
  useEffect(() => {
    getCollectionById();
  }, [userCollection]);

  return (
    <GenericCarousel
      label="Collection"
      items={collectionData}
      openModal={openModal}
    />
  );
}

export default CollectionCarousel;
