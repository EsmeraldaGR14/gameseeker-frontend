import React, { useState } from "react";
import { updateUserEmail, updateUserPassword, getUserById } from "../../utilities/Api/Users";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import "./UpdateProfileForm.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Modal from "../../utilities/common/Modal/Modal";

const UpdateProfileForm = ({ onCancelEdit }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCancel = () => {
    onCancelEdit();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const userDetails = await getUserById(user.id);

      if (email && email === userDetails[0]?.email) {
        console.log("Entered email is the same as the current one");
        return;
      }

      // if (password && password === userDetails[0]?.password) {
      //   console.log("Entered password is the same as the current one");
      //   return;
      // }

      if (email) {
        await updateUserEmail(user.id, { email: email });
        setSuccessModalVisible(true);
        console.log(isSuccessModalVisible);
      }
      if (password) {
        await updateUserPassword(user.id, { password: password });
        setSuccessModalVisible(true);
      }
      // logout();
      // navigate("/login");
    } catch (error) {
      console.log("Error updating user profile", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleModalClose = () => {
    setSuccessModalVisible(false);
    // navigate("/login");
  };

  return (
    <div className="update-container">
      <form className="update-form" onSubmit={handleSubmit}>
        <p>Update Login</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />

        <br></br>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <span
            aria-label={showPassword ? "Hide Password" : "Show Password"}
            className="password-toggle"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button className="update-button" type="submit">
          Update Profile
        </button>
        <button className="cancel-button" type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
      {isSuccessModalVisible && (
        <Modal isVisible={isSuccessModalVisible} onClose={handleModalClose}>
          <p>Profile updated successfully!</p>
        </Modal>
      )}
    </div>
  );
};

export default UpdateProfileForm;
