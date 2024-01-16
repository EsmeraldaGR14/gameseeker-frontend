/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGameById } from "../../utilities/Api/Games";
import Platform from "./Platform";
import Genre from "./Genre";
import Publisher from "./Publisher";
import Developers from "./Developers";
import "./game.css";
import { addGameToCollection } from "../../utilities/Api/Collection";
import { addGameToBacklog } from "../../utilities/Api/Backlog";
import { addGameToWishlist } from "../../utilities/Api/Wishlist";
import { useUser } from "../UserContext";
import BoxArt from "../BoxArt/BoxArt";
import { extractYear } from "../../utilities/helpers/extractYear";
import Modal from "../../utilities/common/Modal/Modal";
import { getGameCollection } from "../../utilities/Api/Collection";
import { getGameWishlist } from "../../utilities/Api/Wishlist";
import { getGameBacklog } from "../../utilities/Api/Backlog";
import DeletionModal from "../../utilities/common/Modal/DeletionModal";
import { deleteGameFromCollection } from "../../utilities/Api/Collection";
import { deleteGameFromBacklog } from "../../utilities/Api/Backlog";
import { deleteGameFromWishlist } from "../../utilities/Api/Wishlist";
import { getUserById } from "../../utilities/Api/Users";
import Subscriptions from "./Subscriptions";
import Screenshots from "./Screenshots"

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState([]);
  const { user } = useUser();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inCollection, setInCollection] = useState(false);
  const [inBacklog, setInBacklog] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [collectionText, setCollectionText] = useState("Add to collection");
  const [backlogText, setBacklogText] = useState("Add to backlog");
  const [wishlistText, setWishlistText] = useState("Add to wishlist");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userData, setUserData] = useState(null);
  const [listName, setListName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  

  useEffect(() => {
    fetchGameById();
  }, [id]);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  async function fetchGameById() {
    try {
      let result = await getGameById(id);
      console.log("this is result:", result);
      setGame(result[0]);
      console.log(game)
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddToCollection = async (e) => {
    e.preventDefault();
    if (user.isLoggedIn === false) {
      openModal();
      return;
    }
      try {
        await addGameToCollection(user.id, id);
        setShowSuccess(true)
        setInCollection(true);
        setCollectionText("Delete from collection")
      } catch (error) {
        console.error("Error adding game to collection:", error);
        setIsModalOpen(true);
      }
  };

  async function handleAddToBacklog() {
    if (user.isLoggedIn === false) {
      openModal();
      return;
    }
    try {
      await addGameToBacklog(user.id, id);
      setShowSuccess(true);
      setInBacklog(true);
      setBacklogText("Delete from backlog");
    } catch (error) {
      console.error("Error adding game to backlog:", error);
      setError("Game not added to backlog.");
    }
  }

  async function handleAddToWishlist() {
    if (user.isLoggedIn === false) {
      openModal();
      return;
    }
    try {
      await addGameToWishlist(user.id, id);
      setShowSuccess(true);
      setInWishlist(true);
      setWishlistText("Delete from wishlist");
    } catch (error) {
      console.error("Error adding game to wishlist:", error);
      setError("Game not added to wishlist.");
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess("");
      setError("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [success, error]);

  useEffect(() => {
    const checkIfGameInCollection = async () => {
      if (user.isLoggedIn) {
        try {
          const userCollection = await getGameCollection(user.id);

          const isGameInCollection = userCollection.data.some(
            (game) => game.id.toString() === id
          );

          if (isGameInCollection) {
            setInCollection(true);
            setCollectionText("Delete from collection");
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
            (game) => game.id.toString() === id
          );

          if (isGameInBacklog) {
            setInBacklog(true);
            setBacklogText("Delete from backlog");
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
            (game) => game.id.toString() === id
          );

          if (isGameInWishlist) {
            setInWishlist(true);
            setWishlistText("Delete from wishlist");
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
  }, [user.isLoggedIn, user.id, id]);

   const handleDeleteGameConfirmation = () => {
     setShowConfirmation(true);
   };

   const handleCloseConfirmation = () => {
     setShowConfirmation(false);
   };

   useEffect(() => {
     const fetchUserData = async () => {
       try {
         const userDetails = await getUserById(user.id);
         setUserData(userDetails);
         // const userCollection = await getGameCollection(user.id);
         // setUserCollection(userCollection.data);

         // const userBacklog = await getGameBacklog(user.id);
         // setBacklog(userBacklog.data);

         // const userWishlist = await getGameWishlist(user.id);
         // setUserWishlist(userWishlist.data);
       } catch (error) {
         console.error("Error fetching user details", error);
       }
     };

     if (user.isLoggedIn) {
       fetchUserData();
     }
   }, [user]);

  const handleDelete = async (id, listName) => {
    try {
      if (listName === "collection") {
        await deleteGameFromCollection(user.id, id);
        // const updatedCollection = userCollection.filter(
        //   (game) => game.id.toString() !== id
        // );
        setShowConfirmation(false);
        setCollectionText("Add to collection");
        setInCollection(false)
      } else if (listName === "backlog") {
        await deleteGameFromBacklog(user.id, id);
        // const updatedBacklog = backlog.filter(
        //   (game) => game.id.toString() !== id
        // );
        setShowConfirmation(false);
        setBacklogText("Add to backlog");
        setInBacklog(false);
      } else if (listName === "wishlist") {
        await deleteGameFromWishlist(user.id, id);
        // const updatedWishlist = userWishlist.filter(
        //   (game) => game.id.toString() !== id
        // );
        setShowConfirmation(false);
        setWishlistText("Add to wishlist");
        setInWishlist(false);
      }
    } catch (error) {
      console.error("Error deleting game", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="game-container">
          <div className="game-details-boxart">
            <BoxArt
              className="boxart"
              image={game.boxart}
              name={game.title}
              year={extractYear(game.release_date)}
              openModal={openModal}
              gameId={game.id}
            />
          </div>
          <div className="game-details-title">
            <h1>{game.title}</h1>
            {game.developers && <Developers developers={game.developers} />}
            {game.publishers && <Publisher publisher={game.publishers} />}
            <p>
              <strong>{game.esrb}</strong>
            </p>
            {game.platforms && <Platform platform={game.platforms} />}
            {game.genres && <Genre genre={game.genres} />}
            <p>
              <strong>Description:</strong> {game.description}
            </p>
          </div>
          <div className="game-details-subscription">
            <article>
              <h2>Play Now</h2>
              <section className="filter">
                <p>
                  <span>Available on:</span>
                </p>
                {game.subscription && (
                  <Subscriptions subscriptions={game.subscription} />
                )}
              </section>
              <div className="single-page-button">
                <button
                  className="collection-button"
                  onClick={
                    inCollection
                      ? () => {
                          setListName("collection");
                          handleDeleteGameConfirmation();
                        }
                      : handleAddToCollection
                  }
                >
                  {collectionText}
                </button>
                <button
                  className="backlog-button"
                  onClick={
                    inBacklog
                      ? () => {
                          setListName("backlog");
                          handleDeleteGameConfirmation();
                        }
                      : handleAddToBacklog
                  }
                >
                  {backlogText}
                </button>
                <button
                  className="wishlist-button"
                  onClick={
                    inWishlist
                      ? () => {
                          setListName("wishlist");
                          handleDeleteGameConfirmation();
                        }
                      : handleAddToWishlist
                  }
                >
                  {wishlistText}
                </button>
              </div>
            </article>
          </div>
        </div>
        {/* {game && game.screenshots && ( */}
        <Screenshots gameScreenshots={game.screenshots} boxart={game.boxart} />
        {/* )} */}
        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            title="Cannot add to list"
            message="If you want to use this feature please sign up for an account."
            type={"error"}
            onClose={closeModal}
          />
        )}
        {showSuccess && user.isLoggedIn && (
          <Modal
            isOpen={showSuccess}
            title="Success"
            type={"success"}
            onClose={() => setShowSuccess(false)}
          />
        )}
        {showConfirmation && (
          <DeletionModal
            isOpen={showConfirmation}
            onClose={handleCloseConfirmation}
            onConfirm={() => handleDelete(game.id, listName)}
            message={`Are you sure you want to delete ${game.title} from your ${listName}?`}
          />
        )}
      </div>
    </>
  );
}

export default GameDetails;
