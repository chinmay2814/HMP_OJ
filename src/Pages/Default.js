// DefaultPage.js

import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import videoSource from "../images/huh-mp4.mp4"; // Import your video file

const DefaultPage = () => {
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <video autoPlay loop style={{ width: "50%", maxWidth: "800px" }}>
            <source src={videoSource} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DefaultPage;
