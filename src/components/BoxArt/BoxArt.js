import React, { useState, useEffect } from "react";
import "./BoxArt.css";
import { FaRegClipboard, FaRegHeart } from "react-icons/fa";
import {
  IoGameControllerOutline,
  IoAddOutline,
  IoRemoveOutline,
} from "react-icons/io5";
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
  deleteGameFromWishlist,
} from "../../utilities/Api/Wishlist";
import { addGameToCollection } from "../../utilities/Api/Collection";
import { addGameToBacklog } from "../../utilities/Api/Backlog";
import { addGameToWishlist } from "../../utilities/Api/Wishlist";

function BoxArt({
  image,
  name,
  year,
  className,
  gameId,
  openModal,
  handleHover,
  handleHoverLeave,
}) {
  const [isControllerHovered, setControllerHovered] = useState(false);
  const [isClipboardHovered, setClipboardHovered] = useState(false);
  const [isHeartHovered, setHeartHovered] = useState(false);
  const { user } = useUser();
  const [titleText, setTitleText] = useState(`${name} (${year})`);
  const [inCollection, setInCollection] = useState(false);
  const [inBacklog, setInBacklog] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const boundingBox = card.getBoundingClientRect();
    const mouseX = e.clientX - boundingBox.left;
    const mouseY = e.clientY - boundingBox.top;
    const rotateX = (mouseY / boundingBox.height - 0.5) * 30;
    const rotateY = (mouseX / boundingBox.width - 0.5) * 30;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    handleHover();
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "rotateX(0) rotateY(0)";
    handleHoverLeave();
  };

  const handleAddToCollection = async (e) => {
    e.preventDefault();
    if (user.isLoggedIn === false) {
      openModal();
      return;
    }
    try {
      await addGameToCollection(user.id, gameId);
      setTitleText("Added to Collection");
      setTimeout(() => {
        setInCollection(true);
      }, 1000);
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
      setTitleText("Added to Backlog");
      setTimeout(() => {
        setInBacklog(true);
      }, 1000);
    } catch (error) {
      console.error("Error adding game to backlog:", error);
    }
  };

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    if (user.isLoggedIn === false) {
      openModal();
      return;
    }
    try {
      await addGameToWishlist(user.id, gameId);
      setTitleText("Added to Wishlist");
      setTimeout(() => {
        setInWishlist(true);
      }, 1000);
    } catch (error) {
      console.error("Error adding game to wishlist:", error);
    }
  };

  const checkIfGameInCollection = async () => {
    if (user.isLoggedIn) {
      try {
        // Assuming getGameCollection returns an array of game IDs in the user's collection
        const userCollection = await getGameCollection(user.id);

        // Check if the current game ID is in the user's collection
        const isGameInCollection = userCollection.data.some(
          (game) => game.id === gameId
        );

        if (isGameInCollection) {
          // Handle the case where the game is in the collection
          setInCollection(true);
        } else {
          // Handle the case where the game is not in the collection
          setInCollection(false);
        }
      } catch (error) {
        console.error("Error fetching user's collection", error);
      }
    } else {
      console.warn("User is not logged in.");
    }
  };

  const checkIfGameInBacklog = async () => {
    if (user.isLoggedIn) {
      try {
        // Assuming getGameBacklog returns an array of game IDs in the user's Backlog
        const userBacklog = await getGameBacklog(user.id);

        // Check if the current game ID is in the user's Backlog
        const isGameInBacklog = userBacklog.data.some(
          (game) => game.id === gameId
        );

        if (isGameInBacklog) {
          // Handle the case where the game is in the Backlog
          setInBacklog(true);
        } else {
          // Handle the case where the game is not in the Backlog
          setInBacklog(false);
        }
      } catch (error) {
        console.error("Error fetching user's Backlog", error);
      }
    } else {
      console.warn("User is not logged in.");
    }
  };

  const checkIfGameInWishlist = async () => {
    if (user.isLoggedIn) {
      try {
        const userWishlist = await getGameWishlist(user.id);
        console.log(userWishlist.data);

        const isGameInWishlist = userWishlist.data.some(
          (game) => game.id === gameId
        );

        if (isGameInWishlist) {
          setInWishlist(true);
        } else {
          setInWishlist(false);
        }
      } catch (error) {
        console.error("Error fetching user's Wishlist", error);
      }
    } else {
      console.warn("User is not logged in.");
    }
  };

  const handleDeleteFromCollection = async (e) => {
    e.preventDefault();
    if (user.isLoggedIn) {
      try {
        await deleteGameFromCollection(user.id, gameId);
        setTitleText("Deleted from Collection");
        setTimeout(() => {
          setInCollection(false);
        }, 1000);
      } catch (error) {
        console.error("Error deleting game", error);
      }
    }
  };

  const handleDeleteFromBacklog = async (e) => {
    e.preventDefault();
    if (user.isLoggedIn) {
      try {
        await deleteGameFromBacklog(user.id, gameId);
        setTitleText("Deleted from Backlog");
        setTimeout(() => {
          setInBacklog(false);
        }, 1000);
      } catch (error) {
        console.error("Error deleting game", error);
      }
    }
  };

  const handleDeleteFromWishlist = async (e) => {
    e.preventDefault();
    if (user.isLoggedIn) {
      try {
        await deleteGameFromWishlist(user.id, gameId);
        setTitleText("Deleted from Wishlist");
        setTimeout(() => {
          setInWishlist(false);
        }, 1000);
      } catch (error) {
        console.error("Error deleting game", error);
      }
    }
  };

  useEffect(() => {
    checkIfGameInCollection();
    checkIfGameInBacklog();
    checkIfGameInWishlist();
  }, []);

  const handleControllerHover = (e) => {
    setControllerHovered(true);
    if (inCollection) {
      setTitleText(`Delete from Collection`);
    } else {
      setTitleText(`Add to Collection`);
    }
  };

  const handleControllerLeave = (e) => {
    setControllerHovered(false);
    setTitleText(`${name} (${year})`);
  };

  const handleClipboardHover = (e) => {
    setClipboardHovered(true);
    if (inBacklog) {
      setTitleText(`Delete from Backlog`);
    } else {
      setTitleText(`Add to Backlog`);
    }
  };

  const handleClipboardLeave = (e) => {
    setClipboardHovered(false);
    setTitleText(`${name} (${year})`);
  };

  const handleHeartHover = (e) => {
    setHeartHovered(true);
    if (inWishlist) {
      setTitleText(`Delete from Wishlist`);
    } else {
      setTitleText(`Add to Wishlist`);
    }
  };

  const handleHeartLeave = (e) => {
    setHeartHovered(false);
    setTitleText(`${name} (${year})`);
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
            className={`controller ${isControllerHovered ? "plus" : ""} ${
              inCollection ? "minus" : ""
            }`}
            onMouseEnter={() => handleControllerHover()}
            onMouseLeave={() => handleControllerLeave()}
            onClick={
              inCollection ? handleDeleteFromCollection : handleAddToCollection
            }
          >
            {isControllerHovered ? (
              inCollection ? (
                <IoRemoveOutline />
              ) : (
                <IoAddOutline />
              )
            ) : (
              <IoGameControllerOutline />
            )}
          </button>
          <button
            type="input"
            className={`clipboard ${isClipboardHovered ? "plus" : ""} ${
              inBacklog ? "minus" : ""
            }`}
            onMouseEnter={() => handleClipboardHover()}
            onMouseLeave={() => handleClipboardLeave()}
            onClick={inBacklog ? handleDeleteFromBacklog : handleAddToBacklog}
          >
            {isClipboardHovered ? (
              inBacklog ? (
                <IoRemoveOutline />
              ) : (
                <IoAddOutline />
              )
            ) : (
              <FaRegClipboard />
            )}
          </button>
          <button
            type="input"
            className={`heart ${isHeartHovered ? "plus" : ""} ${
              inWishlist ? "minus" : ""
            }`}
            onMouseEnter={() => handleHeartHover()}
            onMouseLeave={() => handleHeartLeave()}
            onClick={
              inWishlist ? handleDeleteFromWishlist : handleAddToWishlist
            }
          >
            {isHeartHovered ? (
              inWishlist ? (
                <IoRemoveOutline />
              ) : (
                <IoAddOutline />
              )
            ) : (
              <FaRegHeart />
            )}
          </button>
        </div>
        <h5 className="carousel-item__details--title">{titleText}</h5>
      </div>
    </div>
  );
}

export default BoxArt;
