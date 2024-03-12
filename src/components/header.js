// Header.js
import React from "react";
import "./header.css";
import LoginPage from "../Pages/LoginPage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Header() {
  let userName = "";
  const storedUser = localStorage.getItem("user");
  const navigate = useNavigate();
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    // Now you can use the user data as needed
    userName = userData.user.userName;

    console.log("User :", userName);
  } else {
    console.log("not logged in");
    // User data not found in localStorage, handle accordingly
  }

  const homeclick = () => {
    navigate("/");
  };
  const handleUsername = () => {
    navigate(`/profile/${userName}`);
  };
  const loginclick = () => {
    navigate("/login");
  };
  const signupclick = () => {
    navigate("/signup");
  };
  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/logout");
      if (response.status) {
        localStorage.removeItem("user");
        navigate("/");
      } else {
        console.log("logout failed");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  return (
    <header className="body-components">
      <h2 className="first">HMP OJ</h2>
      <nav className="navigation">
        <div className="nav-left">
          <a onClick={homeclick}>Home</a>
          <a href="#">Practice</a>
          <a href="#">Contest</a>
          <a href="#">Learn</a>
        </div>
        <div className="nav-right">
          {storedUser ? (
            <>
              <a onClick={handleUsername}>{userName}</a>
              <a onClick={handleLogout}>Logout</a>
            </>
          ) : (
            <>
              <a onClick={loginclick}>Login</a>
              <a onClick={signupclick}>Signup</a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
