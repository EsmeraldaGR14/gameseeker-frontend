import React from 'react'
import "./AccountPage.css";
import { useLocation } from "react-router-dom";

function AccountPage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");

 return (
   <div className="account-page-container">
     <h1>Welcome, {email}!</h1>
     <div className="account-details"></div>
     <div className="account-actions">
       <button>Edit Profile</button>
       <button>Change Password</button>
     </div>
   </div>
 );
}

export default AccountPage