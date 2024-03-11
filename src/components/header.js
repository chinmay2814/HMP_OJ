// Header.js
import React from "react";
import "./header.css";
import LoginPage from "../Pages/LoginPage";
function Header() {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const user = JSON.parse(storedUser);
    // Now you can use the user data as needed
    console.log("User data:", user);
  } else {
    console.log("not logged in");
    // User data not found in localStorage, handle accordingly
  }
  return (
    <header className="body-components">
      <h2 class="first">HMP OJ</h2>
      <nav class="navigation">
        <a href="#">Home</a>
        <a href="#">Practice</a>
        <a href="#">Contest</a>
        <a href="#">Learn</a>
        {storedUser ? (
          <a href="#">{storedUser.us}</a>
        ) : (
          <a href="login">Login</a>
        )}
        <a href="signup">Signup</a>
      </nav>
    </header>
  );
}

export default Header;
