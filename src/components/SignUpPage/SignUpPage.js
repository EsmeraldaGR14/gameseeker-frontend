import React, { useState } from "react";
import "./SignUpPage.css";
import { addUser } from "../../utilities/Api/Users";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Modal from "../../utilities/common/Modal/Modal";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

  if (password.length < 8 || password.length > 16) {
    setError(true);
    setErrorMessage("Password must be between 8 and 16 characters long.");
    setLoading(false);
    return;
  }

  try {
    await addUser({
      email,
      password,
    });

    
    // setSuccess("Sign-up successful! Try logging in.");
    setSuccess(true)
    
  } catch (error) {
    console.error("Error signing up:", error);
    setError(true)
    setErrorMessage(
      error.response?.data.error ||
        "Please check your email and password."
    );
  } finally {
    setLoading(false);
  }

  setEmail("");
  setPassword("");
};

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};

const handleCloseSuccess = () => {
  setSuccess(false);
  navigate("/login");
};

const handleCloseError = () => {
  setError(false);
};

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSignUp}>
        <p>Sign Up</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br></br>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            aria-label={showPassword ? "Hide Password" : "Show Password"}
            className="password-toggle"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button className="signup-button" type="submit" disabled={loading}>
          Sign Up
        </button>
      </form>
      <div className="drops">
        <div className="drop drop-1"></div>
        <div className="drop drop-2"></div>
        <div className="drop drop-3"></div>
        <div className="drop drop-4"></div>
        {/* <div className="drop drop-5"></div> */}
      </div>
      <div className="signup-modal">
        {success && (
          <Modal
            isOpen={success}
            onClose={() => handleCloseSuccess()}
            title={`Sign-up Successful`}
            type={"success"}
            message={"Click dismiss to be redirected to the log-in page."}
          />
        )}
      </div>
      <div className="signup-modal">
        {error && (
          <Modal
            isOpen={error}
            onClose={() => handleCloseError()}
            title={`Sign-up Failed`}
            message={errorMessage}
            type={"error"}
          />
        )}
      </div>
    </div>
  );
}


export default SignUpPage;