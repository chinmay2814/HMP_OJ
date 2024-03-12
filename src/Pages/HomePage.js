import React, { useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import LeaderboardComponent from "../components/leaderboard";
import "./commonbody.css";

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
      <div class="full">
        <div className="grid-container1">
          <div className="grid-item1">
            <h6 className="hh">Problemset</h6>
          </div>
          <div className="grid-item2">
            <h6 className="hh">Contest</h6>
          </div>
        </div>
        <div className="grid-container2">
          <div className="grid-item3">
            <h6 className="hh">Topicwise practice</h6>
          </div>
          <div className="grid-item4">
            <h6 className="hh">Random Problem</h6>
          </div>
        </div>
      </div>
      <LeaderboardComponent />
      <Footer />
    </>
  );
};

export default Homepage;
