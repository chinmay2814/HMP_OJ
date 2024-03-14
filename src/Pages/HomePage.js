import React, { useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import LeaderboardComponent from "../components/leaderboard";
import "../CSS/commonbody.css";

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
    <div className="homebody">
      <Header />
      <h1 className="welcometext">
        Embark on your coding<br></br> adventure today .
      </h1>
      <div class="full">
        <div className="links">
          <h6 id="hh6">Start Coding</h6>
          <div class="spacer"></div>
          <div className="linksinside"></div>
          <div className="linksinside"></div>
          <div className="linksinside"></div>
        </div>
      </div>
      <div className="lbbox">
        <LeaderboardComponent />
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
