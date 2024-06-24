import React, { useEffect, useState, useCallback } from "react";
import GenericCarousel from "../Carousel/Carousel";
import { useUser } from "../UserContext";
import { getGameWishlist } from "../../utilities/Api/Wishlist";

function WishlistCarousel({ openModal }) {
  // const { userWishlist} = useUser();

  const { user } = useUser();
  const [userWishlist, setWishlist] = useState([]);

  const getWishlistById = useCallback(async () => {
    try {
      let result = await getGameWishlist(user.id);
      setWishlist(result.data);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  }, [user.id]);

  useEffect(() => {
    getWishlistById();
  }, [getWishlistById]);

  return (
    <GenericCarousel
      label="Wishlist"
      items={userWishlist}
      openModal={openModal}
    />
  );
}

export default WishlistCarousel;
