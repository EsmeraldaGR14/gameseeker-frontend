import React, { useState } from "react";
import "./LoginPage.css";
import { useUser } from "../UserContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Use the login function from the useUser context
      await login({
        email,
        password,
      });

      // Login successful
      setSuccess("Log-in successful!");
      // navigate("/account");
    } catch (error) {
      console.error("Error logging in:", error);
      setError(
        error.response?.data.error ||
          "Log-in failed. Please check your email and password."
      );
    }

    setEmail("");
    setPassword("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="sign-in-container">
      <form className="sign-in-form" onSubmit={handleLogIn}>
        <h1>Log In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          className="password-toggle"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? "Hide Password" : "Show Password"}
        </button>

        <button type="submit">Log In</button>
      </form>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default LoginPage;