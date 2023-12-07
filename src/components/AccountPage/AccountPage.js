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

function AccountPage() {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [collection, setCollection] = useState([]);
  const [backlog, setBacklog] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);

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

  const handleDeleteConfirmation = (gameId) => {
    setShowConfirmation(true);
    setGameToDelete(gameId);
  };

  const handleDeleteCancel = () => {
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
  const renderGameList = (games, handleDelete) => {
    return (
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <Link to={`/games/${game.id}`}>{game.title}</Link>
            <button onClick={() => handleDeleteConfirmation(game.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="account-page-container">
      <h1>Welcome, {userData?.[0]?.email || "User"}!</h1>
      <div className="account-details">
        <div>
          <h2>Collection ({collection.length})</h2>
          {renderGameList(collection, handleDeleteFromCollection)}
        </div>
        <div>
          <h2>Backlog ({backlog.length})</h2>
          {renderGameList(backlog, handleDeleteFromBacklog)}
        </div>
        <div>
          <h2>Wishlist ({wishlist.length})</h2>
          {renderGameList(wishlist, handleDeleteFromWishlist)}
        </div>
        
      </div>
      <div className="account-actions">
        <button>Edit Profile</button>
        <button>Change Password</button>
      </div>
    </div>
  );
}

export default AccountPage;
