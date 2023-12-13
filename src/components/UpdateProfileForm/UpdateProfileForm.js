import React, { useState } from "react";
import { updateUser, getUserById } from "../../utilities/Api/Users";
import { useUser } from "../UserContext";

const UpdateProfileForm = ({ userData, onCancelEdit, email, password }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { user, setUser } = useUser();

  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.email && formData.email !== email) {
        await updateUser(user.id, { email: formData.email });
      }
      if (formData.password && formData.password !== password) {
        await updateUser(user.id, { password: formData.password });
      }
      const updatedUser = await getUserById(user.id);
      setUser(updatedUser);
      setFormData({ email: "", password: "" });
    } catch (error) {
      console.error("Error updating user profile", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} required/>
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UpdateProfileForm;
