import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo1 from "../../../Assets/logo1.png";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { checkIfAdmin } from "../adminUtils";
import styles from "./login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const isAdmin = await checkIfAdmin(user.uid);

        if (isAdmin) {
          navigate("/admin/managelistings");
        } else {
          navigate("/home");
        }
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          setErrorMessage("Incorrect password. Please try again.");
        } else if (error.code === "auth/user-not-found") {
          setErrorMessage("No user found with this email.");
        } else {
          setErrorMessage("Incorrect email or password. Please try again.");
        }
      });
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleReset = () => navigate("/reset");

  return (
    // Add this wrapper to center both the logo and form
    <div className={styles.loginContainer}>
      <img src={logo1} alt="Logo" />
      <h2>Login</h2>
      <form onSubmit={login}>
        <div style={{ width: "100%" }}>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ width: "100%" }}>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
            style={{ width: "100%" }}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <button type="submit">Login</button>
        <p onClick={handleReset}>Forgot Password?</p>
      </form>
    </div>
  );
};

export default Login;
