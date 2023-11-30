import React, { useState, useEffect } from "react";
import "./AccountPage.css";
import { useUser } from "../UserContext";
import { getUserById } from "../../utilities/Api/Users";

function AccountPage() {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDetails = await getUserById(user.id);
        setUserData(userDetails);
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    if (user.isLoggedIn) {
      fetchUserData();
    }
  }, [user]);

  return (
    <div className="account-page-container">
      <h1>Welcome, {userData?.[0]?.email || "User"}!</h1>
      <div className="account-details"></div>
      <div className="account-actions">
        <button>Edit Profile</button>
        <button>Change Password</button>
      </div>
    </div>
  );
}

export default AccountPage;
