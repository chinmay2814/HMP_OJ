import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../CSS/header.css";
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Header() {
  const [click, setClick] = useState(false);
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
        toast.info("Logout successful");
        navigate("/");
        storedUser = null;
      } else {
        console.log("logout failed");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  const handleUserClick = () => {
    navigate(`/profile/${userName}`);
  };
  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <span>HMP OJ</span>
            {/* <i className="fas fa-code"></i> */}
            <span className="icon">
              <CodeIcon />
            </span>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/problemset"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Practice
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/blog"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Contest
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Learn
              </NavLink>
            </li>

            {storedUser ? (
              <>
                <li
                  className="nav-item nav-links nav-right"
                  onClick={handleUserClick}
                >
                  {userName}
                </li>
                <li className="nav-item nav-links " onClick={handleLogout}>
                  Logout
                </li>
              </>
            ) : (
              <>
                <li
                  className="nav-item nav-links nav-right"
                  onClick={loginclick}
                >
                  Login
                </li>
                <li className="nav-item nav-links" onClick={signupclick}>
                  Signup
                </li>
              </>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

            {click ? (
              <span className="icon">
                <HamburgetMenuClose />{" "}
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuOpen />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
