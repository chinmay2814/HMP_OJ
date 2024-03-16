import React, { useState } from "react";
import codeIconGIF from "../images/HMP-OJ-unscreen.png";
import codeIconGIFBlack from "../images/HMP-OJ-unscreen2.png";
// import "../CSS/Default.css";

const Footer = () => {
  const [isBlackTheme, setIsBlackTheme] = useState(false);

  // Function to toggle black theme
  const toggleTheme = () => {
    setIsBlackTheme(!isBlackTheme);
  };
  return (
    <footer class="bg-gray-100 dark:bg-black">
      <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div class="flex justify-center text-teal-600 sm:justify-start">
            <img
              src={isBlackTheme ? codeIconGIFBlack : codeIconGIF}
              alt="Code Icon"
              class=" h-20 w-20 mr-0" // Set height and width to 8%
            />
          </div>

          <p class="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right dark:text-white">
            Copyright &copy; 2023. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
