import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../utilities/Api/Users";

function LoginPage() {
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
      const result = await loginUser({
        email,
        password,
      });

      if (result) {
        setSuccess("Log-in successful!");
      } else {
        setError("Log-in failed. Please check your email and password.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred while logging in.");
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
