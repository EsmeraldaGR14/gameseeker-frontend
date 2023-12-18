import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AccountPage.css";
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
import UpdateProfileForm from "../UpdateProfileForm/UpdateProfileForm";
import ScrollButton from "../../utilities/common/ScrollButton/ScrollButton";
import { FaRegClipboard, FaRegHeart, FaRegTrashAlt } from "react-icons/fa";
import {
  IoGameControllerOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";

function AccountPage() {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [collection, setCollection] = useState([]);
  const [backlog, setBacklog] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditProfile = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDetails = await getUserById(user.id);
        setUserData(userDetails);

        const userCollection = await getGameCollection(user.id);
        setCollection(userCollection.data);

        const userBacklog = await getGameBacklog(user.id);
        setBacklog(userBacklog.data);

        const userWishlist = await getGameWishlist(user.id);
        setWishlist(userWishlist.data);
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    if (user.isLoggedIn) {
      fetchUserData();
    }
  }, [user]);

  const handleDelete = async (gameId, deleteCallback) => {
    try {
      await deleteCallback(gameId);
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error deleting game", error);
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setGameToDelete(null);
  };

  const handleDeleteFromCollection = async (gameId) => {
    try {
      await deleteGameFromCollection(user.id, gameId);
      const updatedCollection = collection.filter((game) => game.id !== gameId);
      setCollection(updatedCollection);
    } catch (error) {
      console.error("Error deleting game from collection", error);
    }
  };

  const handleDeleteFromBacklog = async (gameId) => {
    try {
      await deleteGameFromBacklog(user.id, gameId);
      const updatedBacklog = backlog.filter((game) => game.id !== gameId);
      setBacklog(updatedBacklog);
    } catch (error) {
      console.error("Error deleting game from backlog", error);
    }
  };

  const handleDeleteFromWishlist = async (gameId) => {
    try {
      await deleteGameFromWishlist(user.id, gameId);
      const updatedWishlist = wishlist.filter((game) => game.id !== gameId);
      setWishlist(updatedWishlist);
    } catch (error) {
      console.error("Error deleting game from wishlist", error);
    }
  };
  
  const renderGameList = (games) => {
    return (
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <Link to={`/games/${game.id}`}>{game.title}</Link>
            <button
              className="trash-can"
              onClick={() => {
                setShowConfirmation(true);
                setGameToDelete(game);
              }}
            >
              <FaRegTrashAlt />            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="account-page-container">
      <div className="sidebar">
        <button
          className="edit-profile-button"
          onClick={isEditMode ? handleCancelEdit : handleEditProfile}
        >
          {isEditMode ? "Cancel Edit" : "Edit Profile"}
        </button>
        <button className="delete-profile-button">Delete Profile</button>
      </div>
      <div className="main-content">
        <h1>Welcome, {userData?.[0]?.email || "User"}!</h1>
        {isEditMode ? (
          <div className="account-edit-container">
            <UpdateProfileForm
              userData={userData}
              onCancelEdit={handleCancelEdit}
              email={""}
              password={""}
            />
          </div>
        ) : (
          <div className="account-details">
            <div className="account-collection-container">
              <h2>
                <IoGameControllerOutline /> My Collection ({collection.length})
              </h2>
              {renderGameList(collection, handleDeleteFromCollection)}
              <div className="full-collection-container">
                <Link
                  to={`/collection`}
                >
                  View Full Collection
                </Link>
                <IoArrowForwardCircleOutline />
              </div>
            </div>
            <div className="account-backlog-container">
              <h2>
                <FaRegClipboard /> My Backlog ({backlog.length})
              </h2>
              {renderGameList(backlog, handleDeleteFromBacklog)}
              <div className="full-backlog-container">
                <Link to={`/backlog`}>View Full Backlog</Link>
                <IoArrowForwardCircleOutline />
              </div>
            </div>
            <div className="account-wishlist-container">
              <h2>
                <FaRegHeart /> My Wishlist ({wishlist.length})
              </h2>
              <div className="full-wishlist-container">
                <Link to={`/wishlist`}>View Full Wishlist</Link>
                <IoArrowForwardCircleOutline />
              </div>
            </div>
            {showConfirmation && (
              <div className="confirmation-modal">
                <p>Are you sure you want to delete "{gameToDelete.title}"?</p>
                <button
                  onClick={() =>
                    handleDelete(gameToDelete?.id, handleDeleteFromCollection)
                  }
                >
                  Yes
                </button>
                <button onClick={handleCloseConfirmation}>No</button>
              </div>
            )}
          </div>
        )}
        <ScrollButton />
      </div>
    </div>
  );
}

export default AccountPage;
