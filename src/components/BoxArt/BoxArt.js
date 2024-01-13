import React, { useState, useEffect } from "react";
import "./BoxArt.css";
import { FaRegClipboard, FaRegHeart } from "react-icons/fa";
import {
  IoGameControllerOutline,
  IoAddOutline,
  IoRemoveOutline,
} from "react-icons/io5";
import { useUser } from "../UserContext";
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
  game
  // handleHover,
  // handleHoverLeave,
  // hoverEnabled,
}) {
  const [isControllerHovered, setControllerHovered] = useState(false);
  const [isClipboardHovered, setClipboardHovered] = useState(false);
  const [isHeartHovered, setHeartHovered] = useState(false);
  const { user, setBacklog, backlog, setUserCollection, userCollection, userWishlist, setUserWishlist } = useUser();
  const [inCollection, setInCollection] = useState(false);
  const [inBacklog, setInBacklog] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [titleText, setTitleText] = useState('');

     useEffect(() => {
      setTitleText(year === null ? `${name}` : `${name} (${year})`);
     }, [name, year])

  const handleMouseMove = (e) => {
    // if (!hoverEnabled) return;
    const card = e.currentTarget;
    const boundingBox = card.getBoundingClientRect();
    const mouseX = e.clientX - boundingBox.left;
    const mouseY = e.clientY - boundingBox.top;
    const rotateX = (mouseY / boundingBox.height - 0.5) * 30;
    const rotateY = (mouseX / boundingBox.width - 0.5) * 30;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    // handleHover();
  };

  const handleMouseLeave = (e) => {
    // if (!hoverEnabled) return;
    e.currentTarget.style.transform = "rotateX(0) rotateY(0)";
    // handleHoverLeave();
  };

  const handleAddToCollection = async (e) => {
    e.preventDefault();
    if (user.isLoggedIn === false) {
      openModal();
      return;
    }
    if (user.isLoggedIn && gameId) {
      try {
        await addGameToCollection(user.id, gameId);
        setTitleText("Added to Collection");
        setTimeout(() => {
          setInCollection(true);
          setUserCollection([...userCollection, game]);
        }, 1000);
      } catch (error) {
        console.error("Error adding game to collection:", error);
      }
    }
  };

  const handleAddToBacklog = async (e) => {
    e.preventDefault();
    if (user.isLoggedIn === false) {
      openModal();
      return;
    }
    if (user.isLoggedIn && gameId) {
    try {
      await addGameToBacklog(user.id, gameId);
      setTitleText("Added to Backlog");
      setTimeout(() => {
        setInBacklog(true);
        setBacklog([...backlog, game]);
      }, 1000);
    } catch (error) {
      console.error("Error adding game to backlog:", error);
    }
  }
  };

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    if (user.isLoggedIn === false) {
      openModal();
      return;
    }
    if (user.isLoggedIn && gameId) {
    try {
      await addGameToWishlist(user.id, gameId);
      setTitleText("Added to Wishlist");
      setTimeout(() => {
        setInWishlist(true);
        setUserWishlist([...userWishlist, game]);
      }, 1000);
    } catch (error) {
      console.error("Error adding game to wishlist:", error);
    }
  }
  };

  const handleDeleteFromCollection = async (e) => {
    e.preventDefault();
    if (user.isLoggedIn && gameId) {
      try {
        await deleteGameFromCollection(user.id, gameId);
        const updatedCollection = await getGameCollection(user.id);
        setUserCollection(updatedCollection.data);
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
        const updatedBacklog = await getGameBacklog(user.id);
        setBacklog(updatedBacklog.data);
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
        const updatedUserWishlist = await getGameWishlist(user.id);
        setUserWishlist(updatedUserWishlist.data);
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
   const checkIfGameInCollection = async () => {
     if (user.isLoggedIn) {
       try {
         const userCollection = await getGameCollection(user.id);

         const isGameInCollection = userCollection.data.some(
           (game) => game.id === gameId
         );

         if (isGameInCollection) {
           setInCollection(true);
         } else {
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
         const userBacklog = await getGameBacklog(user.id);

         const isGameInBacklog = userBacklog.data.some(
           (game) => game.id === gameId
         );

         if (isGameInBacklog) {
           setInBacklog(true);
         } else {
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

   if (user.isLoggedIn) {
     checkIfGameInCollection();
     checkIfGameInBacklog();
     checkIfGameInWishlist();
   }
 }, [user.isLoggedIn, user.id, gameId, backlog, userWishlist, userCollection]);

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
      <div className="card-item__details">
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
        <h5 className="card-item__details--title">{titleText}</h5>
      </div>
    </div>
  );
}

export default BoxArt;

// UPDATE game 
// SET subscription = '{"PlayStation Plus Essential"}'
// WHERE id = 14;

// UPDATE game 
// SET subscription = '{"PlayStation Plus Premium"}'
// WHERE id = 16;

// UPDATE game
// SET subscription = '{"Ubisoft+"}'
// WHERE id = 17;

// UPDATE game 
// SET subscription = '{"PlayStation Plus Essential"}'
// WHERE id = 18;

// UPDATE game 
// SET subscription = '{"PlayStation Plus Extra"}'
// WHERE id = 19;

// UPDATE game
// SET subscription = '{"Apple Arcade"}'
// WHERE id = 20;

// UPDATE game 
// SET subscription = '{"PlayStation Plus Essential"}'
// WHERE id = 21;

// UPDATE game 
// SET subscription = '{"Apple Arcade"}'
// WHERE id = 54;

// UPDATE game
// SET subscription = '{"Ubisoft+"}'
// WHERE id = 22;

// UPDATE game 
// SET subscription = '{"PlayStation Plus Extra"}'
// WHERE id = 23;

// UPDATE game 
// SET subscription = '{"Xbox Game Pass Core"}'
// WHERE id = 24;

// UPDATE game
// SET subscription = '{"Ubisoft+"}'
// WHERE id = 25;

// UPDATE game
// SET subscription = '{"EA Play"}'
// WHERE id = 1;
