import React, { useState } from "react";
import "./SignUpPage.css";
import { addUser } from "../../utilities/Api/Users";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

  if (password.length < 8 || password.length > 16) {
    setError("Password must be between 8 and 16 characters long.");
    setLoading(false);
    return;
  }

  try {
    await addUser({
      email,
      password,
    });

    
    setSuccess("Sign-up successful! Try logging in.");
    
  } catch (error) {
    console.error("Error signing up:", error);
    setError(
      error.response?.data.error ||
        "Sign-up failed. Please check your email and password."
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

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSignUp}>
        <h1>Sign Up</h1>
        <input
          type={showPassword ? "text" : "email"}
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
          Sign Up
        </button>
      </form>
      {loading && <p>Signing up</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}


export default SignUpPage;