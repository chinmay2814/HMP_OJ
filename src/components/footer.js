import React, { useState } from "react";
import codeIconGIF from "../images/HMP-OJ-unscreen.png";
import codeIconGIFBlack from "../images/HMP-OJ-unscreen2.png";
// import "../CSS/Default.css";
import { NavLink } from "react-router-dom";
const Footer = () => {
  const [isBlackTheme, setIsBlackTheme] = useState(false);

  // Function to toggle black theme
  const toggleTheme = () => {
    setIsBlackTheme(!isBlackTheme);
  };
  return (
    <footer class="bg-white rounded-lg  m-4 dark:bg-gray-800">
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="" class="hover:underline">
            HMP OJ
          </a>
          . All Rights Reserved.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <NavLink exact to="/about">
              <a class="hover:underline me-4 md:me-6 text-black">About</a>
            </NavLink>
          </li>

          <li>
            <NavLink exact to="/contact">
              <a class="hover:underline text-black">Contact</a>
            </NavLink>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
