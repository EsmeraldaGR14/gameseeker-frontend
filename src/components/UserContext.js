import { createContext, useContext, useState, useEffect } from "react";
import { loginUser } from "../utilities/Api/Users";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Check if there is a user state in localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    isLoggedIn: false,
    userId: null,
    email: null,
  };

  const [user, setUser] = useState(storedUser);

  useEffect(() => {
    // Update localStorage whenever the user state changes
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const login = async (userData) => {
    try {
      const response = await loginUser(userData);

      const { id, email } = response;

      setUser({ isLoggedIn: true, id, email });
    } catch (error) {
      console.error("Error logging user in", error);
    }
  };

  const logout = () => {
    setUser({ isLoggedIn: false, id: null, email: null });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => {
  return useContext(UserContext);
};
