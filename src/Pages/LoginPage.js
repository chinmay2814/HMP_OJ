import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Import CSS file

const LoginPage = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hi");
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        userName,
        password,
      });

      if (response.status === 200) {
        const user = await response.data;
        // Handle successful login
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Login successful:", user);

        toast.success("Login successful!");
        navigate("/");
      } else {
        // Handle login failure

        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "/api/auth";
  };
  return (
    <div className="wrapper">
      <div class="form-box login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div class="input-box">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={handleUsernameChange}
            />
          </div>
          <div class="input-box">
            <label htmlFor="password">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <input
              type="checkbox"
              id="showPasswordCheckbox"
              checked={showPassword}
              onChange={handleShowPasswordToggle}
            />
            <label htmlFor="showPasswordCheckbox">Show password</label>
          </div>
          <p> </p>
          <button type="submit" class="btn" onClick={handleSubmit}>
            Login
          </button>
          <p> </p>
          <button type="submit" class="btn2" onClick={handleGoogleLogin}>
            Login in with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
