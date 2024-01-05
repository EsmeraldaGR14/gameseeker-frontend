import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AccountPage.css";
import { useUser } from "../UserContext";
import {
  deleteGameFromCollection,
} from "../../utilities/Api/Collection";
import {
  deleteGameFromBacklog,
} from "../../utilities/Api/Backlog";
import {
  deleteGameFromWishlist,
} from "../../utilities/Api/Wishlist";
import { getUserById, deleteUser } from "../../utilities/Api/Users"
import UpdateProfileForm from "../UpdateProfileForm/UpdateProfileForm";
import ScrollButton from "../../utilities/common/ScrollButton/ScrollButton";
import { FaRegClipboard, FaRegHeart, FaRegTrashAlt } from "react-icons/fa";
import {IoGameControllerOutline, IoArrowForwardCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import DeletionModal from "../../utilities/common/Modal/DeletionModal";

function AccountPage() {
  const {
    user,
    logout,
    setBacklog,
    backlog,
    setUserCollection,
    userCollection,
  } = useUser();
  const [userData, setUserData] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showUserDeletionConfirmation, setUserDeletionConfirmation] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [listName, setListName] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();

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

        // const userCollection = await getGameCollection(user.id);
        // setUserCollection(userCollection.data);

        // const userBacklog = await getGameBacklog(user.id);
        // setBacklog(userBacklog.data);

        // const userWishlist = await getGameWishlist(user.id);
        // setWishlist(userWishlist.data);
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    if (user.isLoggedIn) {
      fetchUserData();
    }
  }, [user]);

  const handleDelete = async (gameId, listName) => {
    try {
      if (listName === "collection") {
        await deleteGameFromCollection(user.id, gameId);
        const updatedCollection = userCollection.filter(
          (game) => game.id !== gameId
        );
        setUserCollection(updatedCollection);
        setShowConfirmation(false);
        setShowOverlay("false");
      } else if (listName === "backlog") {
        await deleteGameFromBacklog(user.id, gameId);
        const updatedBacklog = backlog.filter((game) => game.id !== gameId);
        setBacklog(updatedBacklog);
        setShowConfirmation(false);
        setShowOverlay("false");
      } else if (listName === "wishlist") {
        await deleteGameFromWishlist(user.id, gameId);
        const updatedWishlist = wishlist.filter((game) => game.id !== gameId);
        setWishlist(updatedWishlist);
        setShowConfirmation(false);
        setShowOverlay(false);
      }
      setShowOverlay(false);
    } catch (error) {
      console.error("Error deleting game", error);
    }
  };

  const handleUserDelete = async () => {
    try {
      await deleteUser(user.id);
      setUserDeletionConfirmation(false);
      setShowOverlay(false);
      logout();
      navigate("/");
    } catch (error) {
      console.error("Error deleting user", error);
    }
  }

  const handleDeleteGameConfirmation = (game, listName) => {
    setShowConfirmation(true);
    setGameToDelete(game);
    setListName(listName);
    setShowOverlay(true);
  };
  
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setGameToDelete(null);
    setListName("");
    setShowOverlay(false);
  };

  const handleDeleteUserConfirmation = () => {
    setUserDeletionConfirmation(true);
    setShowOverlay(true);
  };

  const handleUserCloseConfirmation = () => {
    setUserDeletionConfirmation(false);
    setShowOverlay(false);
  };

  return (
    <div className="container">
      {showOverlay && <div className="deletion-overlay" />}
      <div className="sort-buttons">
        <button
          className="edit-profile-button"
          onClick={isEditMode ? handleCancelEdit : handleEditProfile}
        >
          {isEditMode ? "Cancel Edit" : "Edit Profile"}
        </button>
        <button
          className="delete-profile-button"
          onClick={() => {
            handleDeleteUserConfirmation();
          }}
        >
          Delete Profile
        </button>
      </div>
      <div className="main-content">
        <header>
          <h1>Welcome, {userData?.[0]?.email || "User"}!</h1>
        </header>
        {isEditMode ? (
          <p>
            Change your email or password below. After either one is updated you
            will need to login again with your new credentials.
          </p>
        ) : (
          <p>
            Ready to dive into your gaming haven? This is your backstage pass to
            check out your gaming conquests. From here, you can gaze upon your
            collection kingdom, check your progress, or bid farewell to those
            that served their quest. Let the gaming odyssey begin!
          </p>
        )}
        {isEditMode ? (
          <UpdateProfileForm
            onCancelEdit={handleCancelEdit}
            isEditMode={isEditMode}
            showUserDeletionConfirmation={showUserDeletionConfirmation}
            handleUserCloseConfirmation={handleUserCloseConfirmation}
            handleUserDelete={handleUserDelete}
            userData={userData}
          />
        ) : (
          <div className="account-details">
            <div className="account-collection-container">
              <div className="my-collection-container">
                <h2>
                  <IoGameControllerOutline /> My Collection ({userCollection.length}
                  )
                </h2>
              </div>
              <ul>
                {userCollection.length === 0 ? (
                  <p className="empty-list-text">Add games from the catalog!</p>
                ) : (
                  userCollection.slice(0, 5).map((game) => (
                    <li key={game.id} >
                      <Link to={`/games/${game.id}`}>{game.title}</Link>
                      <button
                        className="trash-can"
                        onClick={() => {
                          handleDeleteGameConfirmation(game, "collection");
                        }}
                      >
                        <FaRegTrashAlt />
                      </button>
                    </li>
                  ))
                )}
              </ul>
              <div className="full-collection-container">
                {userCollection.length > 0 && (
                  <>
                    <Link to={`/collection`}>View Full Collection</Link>
                    <IoArrowForwardCircleOutline />
                  </>
                )}
              </div>
            </div>
            <div className="account-backlog-container">
              <div className="my-backlog-container">
                <h2>
                  <FaRegClipboard /> My Backlog ({backlog.length})
                </h2>
              </div>
              <ul>
                {backlog.length === 0 ? (
                  <p className="empty-list-text">Add games from the catalog!</p>
                ) : (
                  backlog.slice(0, 5).map((game) => (
                    <li key={game.id}>
                      <div className="list-item-content">
                        <Link to={`/games/${game.id}`}>{game.title}</Link>
                        <button
                          className="trash-can"
                          onClick={() => {
                            handleDeleteGameConfirmation(game, "backlog");
                          }}
                        >
                          <FaRegTrashAlt />
                        </button>
                      </div>
                    </li>
                  ))
                )}
              </ul>
              <div className="full-backlog-container">
                {backlog.length > 0 && (
                  <>
                    <Link to={`/backlog`}>View Full Backlog</Link>
                    <IoArrowForwardCircleOutline />
                  </>
                )}
              </div>
            </div>
            <div className="account-wishlist-container">
              <div className="my-wishlist-container">
                <h2>
                  <FaRegHeart /> My Wishlist ({wishlist.length})
                </h2>
              </div>
              <ul>
                {wishlist.length === 0 ? (
                  <p className="empty-list-text">Add games from the catalog!</p>
                ) : (
                  wishlist.slice(0, 5).map((game) => (
                    <li key={game.id}>
                      <Link to={`/games/${game.id}`}>{game.title}</Link>
                      <button
                        className="wishlist-trash-can"
                        onClick={() => {
                          handleDeleteGameConfirmation(game, "wishlist");
                        }}
                      >
                        <FaRegTrashAlt />
                      </button>
                    </li>
                  ))
                )}
              </ul>
              <div className="full-wishlist-container">
                {wishlist.length > 0 && (
                  <>
                    <Link to={`/wishlist`}>View Full Wishlist</Link>
                    <IoArrowForwardCircleOutline />
                  </>
                )}
              </div>
            </div>
            {showConfirmation && (
              <DeletionModal
                isOpen={showConfirmation}
                onClose={handleCloseConfirmation}
                message={`Are you sure you want to delete ${gameToDelete?.title} from your ${listName}?`}
                onConfirm={() => handleDelete(gameToDelete?.id, listName)}
              />
            )}
            {showUserDeletionConfirmation && (
              <DeletionModal
                isOpen={showUserDeletionConfirmation}
                onClose={handleUserCloseConfirmation}
                message={`Are you sure you want to delete ${userData?.[0]?.email}? All of your lists will also be deleted. This action cannot be undone.`}
                onConfirm={handleUserDelete}
              />
            )}
          </div>
        )}
        <ScrollButton />
      </div>
    </div>
  );
}

export default AccountPage;
