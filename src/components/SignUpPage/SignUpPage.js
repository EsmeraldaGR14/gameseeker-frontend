import React, { useState } from "react";
import "./SignUpPage.css";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState('')

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    setError(null);
    if (email !== "" && password !== "") {
      setSuccess("User successfully signed up!");
      setEmail("");
      setPassword("");
    } else {
      setError("Sign-up failed. Please check your email and password.");
    } 
};

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSignUp}>
        <h1>Sign Up</h1>
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

        <button type="submit">Sign Up</button>
      </form>
      {success ? (
        <p className="success-message">{success}</p>
      ) : (
        error && <p className="error-message">{error}</p>
      )}
    </div>
  );
}


export default SignUpPage