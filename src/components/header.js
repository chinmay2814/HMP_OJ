// Header.js
import React from "react";
import "./components.css";
import LoginPage from "../Pages/LoginPage";
function Header() {
  return (
    <header>
      <h2 class="first">HMP OJ</h2>
      <nav class="navigation">
        <a href="#">Home</a>
        <a href="#">Practice</a>
        <a href="#">Contest</a>
        <a href="#">Learn</a>
        <a href="login">Login</a>
        <a href="signup">Signup</a>
      </nav>
    </header>
  );
}

export default Header;
