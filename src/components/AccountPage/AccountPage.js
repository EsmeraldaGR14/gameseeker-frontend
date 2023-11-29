import React from "react";
import "./AccountPage.css";
import { useUser } from "../UserContext";

function AccountPage() {
  const { user } = useUser();

  return (
    <div className="account-page-container">
      <h1>Welcome, {user.email}!</h1>
      <div className="account-details"></div>
      <div className="account-actions">
        <button>Edit Profile</button>
        <button>Change Password</button>
      </div>
    </div>
  );
}

export default AccountPage;
