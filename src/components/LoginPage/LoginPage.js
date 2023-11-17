import React, { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    setError(null); 
    try {

      if (email === "test@example.com" && password === "password123") {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("User successfully logged in!");
      navigate(`/`);
    } else {
      throw new Error("Invalid email or password.");
    }
    } catch (error) {
      console.error('Error during sign-in:', error);
      setError(
      error.message || "Sign-in failed. Please check your email and password."
    );
  }
  setEmail("");
  setPassword("");
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
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Log In</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default LoginPage;
