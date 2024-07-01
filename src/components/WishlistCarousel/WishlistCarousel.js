import React, { useEffect, useState, useCallback } from "react";
import GenericCarousel from "../Carousel/Carousel";
import { useUser } from "../UserContext";
import { getGameWishlist } from "../../utilities/Api/Wishlist";

function WishlistCarousel({ openModal }) {
  const { user, userWishlist } = useUser();
  const [wishlistData, setWishlist] = useState([]);

  const getWishlistById = useCallback(async () => {
    try {
      let result = await getGameWishlist(user.id);
      setWishlist(result.data);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  }, [user.id]);

  //When the wishlist in the user context is updated by the boxart refetch the updated info
  useEffect(() => {
    getWishlistById();
  }, [userWishlist]);

  return (
    <GenericCarousel
      label="Wishlist"
      items={wishlistData}
      openModal={openModal}
    />
  );
}

export default WishlistCarousel;
