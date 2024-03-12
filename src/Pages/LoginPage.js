import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Import CSS file
import Footer from "../components/footer";

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

  const handleGoogle = async (e) => {};
  return (
    <>
      <div className="loginbody">
        <div className="wrapper">
          <div className="form-box login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={userName}
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="input-box">
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

              <button type="submit" className="btn" onClick={handleSubmit}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
