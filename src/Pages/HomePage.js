import React, { useState } from "react";
import Header from "../components/header";

const Homepage = () => {
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
    <>
      <Header />
      <div className="grid-container">
        <div className="grid-item">
          <h1>Problemset</h1>
          <a href="#">here</a>
        </div>
        <div className="grid-item">
          <h1>Contest</h1>
          <a href="#">here</a>
        </div>
        <div className="grid-item">
          <h1>Topicwise practice</h1>
          <a href="#">here</a>
        </div>
        <div className="grid-item">
          <h1>Random Problem</h1>
          <a href="#">here</a>
        </div>
      </div>

      {/* Other content goes here */}
    </>
  );
};

export default Homepage;
