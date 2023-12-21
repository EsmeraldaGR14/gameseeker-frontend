import React, { useState } from "react";
import { updateUserEmail, updateUserPassword, getUserById } from "../../utilities/Api/Users";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import "./UpdateProfileForm.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Modal from "../../utilities/common/Modal/Modal";
import DeletionModal from "../../utilities/common/Modal/DeletionModal";

const UpdateProfileForm = ({
  onCancelEdit,
  handleUserDelete,
  showUserDeletionConfirmation,
  handleUserCloseConfirmation,
  userData
}) => {
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
        alert("New email cannot be the same as the current one");
        return;
      }

      // if (password && password === userDetails[0]?.password) {
      //   console.log("Entered password is the same as the current one");
      //   return;
      // }

      if (email) {
        await updateUserEmail(user.id, { email: email });
        setSuccessModalVisible(true);
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
    logout();
    setSuccessModalVisible(false);
    navigate("/login");
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
        <Modal
          isOpen={isSuccessModalVisible}
          onClose={() => handleModalClose()}
          title={`Profile Successfully Updated`}
          message={`Please log in again with your new credentials.`}
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
  );
};

export default UpdateProfileForm;
