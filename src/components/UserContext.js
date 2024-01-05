import { createContext, useContext, useState, useEffect } from "react";
import { loginUser } from "../utilities/Api/Users";
import { getGameBacklog } from "../utilities/Api/Backlog";
import { getGameCollection } from "../utilities/Api/Collection";
import { getGameWishlist } from "../utilities/Api/Wishlist";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Check if there is a user state in localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    isLoggedIn: false,
    userId: null,
  };

  const [user, setUser] = useState(storedUser);
  const [backlog, setBacklog] = useState([]);
  const [userWishlist, setUserWishlist] = useState([]);
  const [userCollection, setUserCollection] = useState([]);

  useEffect(() => {
    // Update localStorage whenever the user state changes
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const login = async (userData) => {
    try {
      const response = await loginUser(userData);
      console.log("Login successful. Response:", response);
      const { id } = response;

      setUser({ isLoggedIn: true, id });
    } catch (error) {
      console.error("Error logging user in", error);
      throw error;
    }
  };

  const logout = () => {
    setUser({ isLoggedIn: false, id: null });
  };

  useEffect(() => {
    if (user.isLoggedIn && user.id) {
      const fetchBacklog = async () => {
        try {
          const result = await getGameBacklog(user.id);
          setBacklog(result.data);
          console.log("Backlog data fetched:", result.data);
        } catch (error) {
          console.error("Error fetching backlog data:", error);
        }
      };

      fetchBacklog();
    }
  }, [user.isLoggedIn, user.id]);

  useEffect(() => {
    if (user.isLoggedIn && user.id) {
      const fetchCollection = async () => {
        try {
          const result = await getGameCollection(user.id);
          setUserCollection(result.data);
          console.log("Backlog data fetched:", result.data);
        } catch (error) {
          console.error("Error fetching backlog data:", error);
        }
      };

      fetchCollection();
    }
  }, [user.isLoggedIn, user.id]);

  useEffect(() => {
    if (user.isLoggedIn && user.id) {
      const fetchWishlist = async () => {
        try {
          const result = await getGameWishlist(user.id);
          setUserWishlist(result.data);
          console.log("Backlog data fetched:", result.data);
        } catch (error) {
          console.error("Error fetching backlog data:", error);
        }
      };

      fetchWishlist();
    }
  }, [user.isLoggedIn, user.id]);

  return (
    <UserContext.Provider
      value={{ user, login, logout, setUser, backlog, setBacklog, userCollection, setUserCollection, setUserWishlist, userWishlist }}
    >
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => {
  return useContext(UserContext);
};
