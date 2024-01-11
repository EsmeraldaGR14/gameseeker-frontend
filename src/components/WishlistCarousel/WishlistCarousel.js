import React from "react";
import GenericCarousel from "../Carousel/Carousel";
import { useUser } from "../UserContext";

function WishlistCarousel({ openModal }) {
  const { userWishlist} = useUser();

  return (
    <GenericCarousel
      label="Wishlist"
      items={userWishlist}
      openModal={openModal}
    />
  );
}

export default WishlistCarousel;
