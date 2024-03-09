// Header.js
import React from "react";
import logo from "./logo.png"; // Import your logo file
function Header() {
  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        {/* <img src={logo} alt="Logo" style={{ width: "100px", height: "auto" }} /> */}
      </div>
      <div style={profileStyle}>
        {/* Place your profile information here */}
        <span>Welcome, Username</span>
        {/* You can add more profile details or dropdowns */}
      </div>
    </header>
  );
}

// Styles
const headerStyle = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const logoStyle = {
  marginRight: "auto", // Pushes profile section to the right
};

const profileStyle = {
  marginLeft: "auto", // Pushes profile section to the right
  textAlign: "right",
};

export default Header;
