import React from "react";
import ReactLoading from "react-loading";

const LoadingComponent = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
      backdropFilter: "blur(8px)", // Blur effect
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999, // Ensure the loading component appears on top of other elements
    }}
  >
    <ReactLoading type="bars" color="#fcfcfc" height={100} width={100} />
  </div>
);

export default LoadingComponent;
