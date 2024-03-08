// LoginPage.js
import React, { useState } from "react";
import "./LoginPage.css"; // Import CSS file

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your login logic here, such as sending credentials to a server
    console.log("Username:", username);
    console.log("Password:", password);
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
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <button type="submit" class="btn">Login</button>
      </form>
      </div>
    </div>
  );
};

export default LoginPage;
