import React, { useState } from "react";
import Header from "../components/header";
import "./commonbody.css"

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
          <h3>Problemset</h3>
          <p class="para">HMP OJ provides you the problemset where you can practise, you can start practising by clicking 
          <a href="#">here</a>
          "."
          </p>
        </div>
        <div className="grid-item2">
          <h3>Contest</h3>
          <p class="para">"You can compete with the others and find out where you stand, to participate in the contest click "
          <a href="#">here</a>
          "."
          </p>
        </div>
        </div>
        <div className="grid-container2">
        <div className="grid-item3">
          <h3>Topicwise practice</h3>
          <p class="para">"You can practise the problems from the topics of your choice, click "
          <a href="#">here</a>
          " to start practising."
          </p>
        </div>
        <div className="grid-item4">
          <h3>Random Problem</h3>
          <p class="para">"Start practising the random problems by clicking "
          <a href="#">here</a>
          "."
          </p>
        </div>
      </div>

      </div>
      {/* Other content goes here */}
    </>
  );
};

export default Homepage;
