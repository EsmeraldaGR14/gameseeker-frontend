import React, { useState } from "react";
import "./SignUpPage.css";
import { addUser } from "../../utilities/Api/Users";


function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await addUser({
        email,
        password,
      });

      if (result) {
        setSuccess("Sign-up successful! Try logging in.");
      } else {
        setError("Sign-up failed. Please check your email and password.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setError("An error occurred while signing up.");
    }
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


export default SignUpPage;