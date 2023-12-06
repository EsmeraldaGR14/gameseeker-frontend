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

      
      setSuccess("Log-in successful!");
      navigate("/account")
    } catch (error) {
      
      setError(
        error.response?.data.error ||
          "Log-in failed. Please check your email and password."
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

        <button type="submit" disabled={loading}>
          Log In
        </button>
      </form>
      {loading && <p>Logging in</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}

export default LoginPage;