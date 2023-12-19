import React, { useState } from "react";
import { updateUserEmail, updateUserPassword } from "../../utilities/Api/Users";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";

const UpdateProfileForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email) {
        await updateUserEmail(user.id, {email: email});
      }
      if (password) {
        await updateUserPassword(user.id, {password: password});
      }
      logout();
      navigate("/login")
    } catch (error) {
      console.log("Error updating user profile", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={handleEmailChange}/>
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UpdateProfileForm;
