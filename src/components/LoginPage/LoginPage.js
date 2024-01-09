import React, { useState } from "react";
import "./LoginPage.css";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Modal from "../../utilities/common/Modal/Modal";

function LoginPage() {
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login({
        email,
        password,
      });
      setSuccess(true);
    } catch (error) {
      setError(
        true
        // error.response?.data.error ||
        //   "Log-in failed. Please check your email and password."
      );
      console.error("Error logging in:", error);
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
    setSuccess(false)
    navigate("/account");
  };

  const handleCloseError = () => {
    setError(false);
  };

  return (
    <div className="container">
      <div className="sign-in-container">
        <form className="sign-in-form" onSubmit={handleLogIn}>
          <p>Log In</p>
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
          <button className="login-button" type="submit" disabled={loading}>
            Log In
          </button>
        </form>
        <div className="drops">
          <div className="drop drop-1"></div>
          <div className="drop drop-2"></div>
          <div className="drop drop-3"></div>
          <div className="drop drop-4"></div>
          {/* <div className="drop drop-5"></div> */}
        </div>
        <div className="login-modal">
          {success && (
            <Modal
              isOpen={success}
              onClose={() => handleCloseSuccess()}
              title={`Log-in Successful`}
              type={"success"}
            />
          )}
        </div>
        <div className="login-modal">
          {error && (
            <Modal
              isOpen={error}
              onClose={() => handleCloseError()}
              title={`Log-in Failed`}
              message={`Please check your email and password.`}
              type={"error"}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;