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
    <div className="login-page-body">
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
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ position: "relative" }}
          />
          <span
            aria-label="Show/Hide Password"
            className="password-toggle"
            onClick={togglePasswordVisibility}
          >
            <i class="fa-solid fa-eye"></i>
          </span>
        <button type="submit" disabled={loading}>
          Log In
        </button>
      </form>
      <div class="drops">
        <div className="drop drop-1"></div>
        <div className="drop drop-2"></div>
        <div className="drop drop-3"></div>
        <div className="drop drop-4"></div>
        <div className="drop drop-5"></div>
      </div>
      {loading && <p>Logging in</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
    </div>
  );
}

export default LoginPage;