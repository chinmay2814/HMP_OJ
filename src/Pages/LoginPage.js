import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Import CSS file

const LoginPage = () => {
  const [username, setUsername] = useState("");
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
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const user = await response.data;
        // Handle successful login (e.g., store token in local storage)
        console.log("Login successful:", user);

        toast.success("Login successful!");
        navigate("/");
      } else {
        // Handle login failure (e.g., show error message)
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
              value={username}
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

          <button type="submit" class="btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
