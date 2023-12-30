import React, { useState } from "react";
import "./BoxArt.css";
import { FaRegClipboard, FaRegHeart } from "react-icons/fa";
import { IoGameControllerOutline, IoAddOutline } from "react-icons/io5";
import { useUser } from "../UserContext";
import { getUserById } from "../../utilities/Api/Users";
import {
  getGameCollection,
  deleteGameFromCollection,
} from "../../utilities/Api/Collection";
import {
  getGameBacklog,
  deleteGameFromBacklog,
} from "../../utilities/Api/Backlog";
import {
  getGameWishlist,
  // deleteGameFromWishlist,
} from "../../utilities/Api/Wishlist";
import { addGameToCollection } from "../../utilities/Api/Collection";
import { addGameToBacklog } from "../../utilities/Api/Backlog";
import { addGameToWishlist } from "../../utilities/Api/Wishlist";
import Modal from "../../utilities/common/Modal/Modal";

function BoxArt({ image, name, year, className, gameId }) {
  const [isControllerHovered, setControllerHovered] = useState(false);
  const [isClipboardHovered, setClipboardHovered] = useState(false);
  const [isHeartHovered, setHeartHovered] = useState(false);
  const { user } = useUser();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const boundingBox = card.getBoundingClientRect();
    const mouseX = e.clientX - boundingBox.left;
    const mouseY = e.clientY - boundingBox.top;
    const rotateX = (mouseY / boundingBox.height - 0.5) * 30;
    const rotateY = (mouseX / boundingBox.width - 0.5) * 30;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "rotateX(0) rotateY(0)";
  };

  const handleAddToCollection = async (e) => {
    e.preventDefault();
    if (user.isLoggedIn === false) {
      openModal();
      return;
    }
    try {
      await addGameToCollection(user.id, gameId);
      console.log(user);
      console.log("Game successfully added to collection!");
    } catch (error) {
      console.error("Error adding game to collection:", error);
    }
  };

  const handleAddToBacklog = async (e) => {
    e.preventDefault();
    if (user.isLoggedIn === false) {
      openModal();
      return;
    }
    try {
      await addGameToBacklog(user.id, gameId);
      console.log("Game successfully added to backlog!");
    } catch (error) {
      console.error("Error adding game to backlog:", error);
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      className={`card ${className ? className : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img className="card-image" src={image} alt={name}></img>
      <div className="carousel-item__details">
        <div className="controls">
          <button
            type="input"
            className={`controller ${isControllerHovered ? "plus" : ""}`}
            onMouseEnter={() => setControllerHovered(true)}
            onMouseLeave={() => setControllerHovered(false)}
            onClick={handleAddToCollection}
          >
            {isControllerHovered ? (
              <IoAddOutline />
            ) : (
              <IoGameControllerOutline />
            )}
          </button>
          <button
            type="input"
            className={`clipboard ${isClipboardHovered ? "plus" : ""}`}
            onMouseEnter={() => setClipboardHovered(true)}
            onMouseLeave={() => setClipboardHovered(false)}
            onClick={handleAddToBacklog}
          >
            {isClipboardHovered ? <IoAddOutline /> : <FaRegClipboard />}
          </button>
          <button
            type="input"
            className={`heart ${isHeartHovered ? "plus" : ""}`}
            onMouseEnter={() => setHeartHovered(true)}
            onMouseLeave={() => setHeartHovered(false)}
          >
            {isHeartHovered ? <IoAddOutline /> : <FaRegHeart />}
          </button>
        </div>
        <h5 class="carousel-item__details--title">
          {name} ({year})
        </h5>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => closeModal()}
          title={`Cannot add to list`}
          message={
            "If you want to use this feature please sign up for an account."
          }
          type={"error"}
        />
      )}
    </div>
  );
}

export default BoxArt;
