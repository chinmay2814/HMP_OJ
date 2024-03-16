import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../CSS/header.css";
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import axios from "axios";
import codeIconGIF from "../images/HMP-OJ-unscreen.png";
import codeIconGIFBlack from "../images/HMP-OJ-unscreen2.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Header() {
  const [click, setClick] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let userName = "";
  const storedUser = localStorage.getItem("user");
  const navigate = useNavigate();
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    // Now you can use the user data as needed
    userName = userData.user.userName;

    console.log("User :", userName);
  } else {
    console.log("not logged in");
    // User data not found in localStorage, handle accordingly
  }

  const loginclick = () => {
    navigate("/login");
  };
  const signupclick = () => {
    navigate("/signup");
  };
  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/logout");
      if (response.status) {
        localStorage.removeItem("user");
        toast.info("Logout successful");
        navigate("/");
        storedUser = null;
      } else {
        console.log("logout failed");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  const handleUserClick = () => {
    navigate(`/profile/${userName}`);
  };
  const handleClick = () => setIsDropdownOpen(!isDropdownOpen);
  const [isBlackTheme, setIsBlackTheme] = useState(false);

  // Function to toggle black theme
  const toggleTheme = () => {
    setIsBlackTheme(!isBlackTheme);
  };
  return (
    <header class="bg-white dark:bg-gray-900">
      <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-14 items-center justify-between">
          <div class="flex-1 md:flex md:items-center md:gap-12">
            <NavLink exact to="/">
              <a class="" exact to="/" onClick={handleClick}>
                <span onClick={handleClick}></span>
                <img
                  src={codeIconGIF}
                  to="/"
                  onClick={handleClick}
                  alt="Code Icon"
                  class="h-12 w-auto"
                />
              </a>
            </NavLink>
          </div>
          <div class="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" class="hidden md:block">
              <ul class="flex items-center gap-10 text-sm mr-20">
                <li class="flex items-center h-full">
                  <NavLink exact to="/problemset" onClick={handleClick}>
                    <a
                      class="text-black  hover:scale-110 dark:text-white font-mono text-lg flex items-center h-full mt-4"
                      href="#"
                    >
                      Practice
                    </a>
                  </NavLink>
                </li>
                <li class="flex items-center h-full">
                  <NavLink exact to="/contest" onClick={handleClick}>
                    <a
                      class="text-black  hover:scale-110 dark:text-white font-mono text-lg flex items-center h-full mt-4"
                      href="#"
                    >
                      Contest
                    </a>
                  </NavLink>
                </li>
                <li class="flex items-center h-full">
                  <NavLink exact to="/problemset" onClick={handleClick}>
                    <a
                      class="text-black  hover:scale-110 dark:text-white font-mono text-lg flex items-center h-full mt-4"
                      href="#"
                    >
                      Chat
                    </a>
                  </NavLink>
                </li>
                <li class="flex items-center h-full">
                  <NavLink exact to="/blogs" onClick={handleClick}>
                    <a
                      class="text-black  hover:scale-110 dark:text-white font-mono text-lg flex items-center h-full mt-4"
                      href="#"
                    >
                      Blog
                    </a>
                  </NavLink>
                </li>
              </ul>
            </nav>

            <div class="flex items-center gap-4">
              {storedUser ? (
                <>
                  <li
                    class="flex items-center h-full"
                    onClick={handleUserClick}
                  >
                    <NavLink onClick={handleUserClick}>
                      <a class="text-black border rounded-lg px-2 py-2.5 hover:scale-105 dark:text-white font-mono text-lg flex items-center h-full mt-2">
                        {userName}
                      </a>
                    </NavLink>
                  </li>

                  <button
                    type="button"
                    onClick={handleLogout}
                    class="inline-block rounded bg-gray-500 font-mono px-6 py-2 pb-2 pt-2.5 text-lg font-medium underline leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={loginclick}
                    class="inline-block rounded bg-neutral-100 px-6 py-2 pb-2 pt-2.5 text-lg font-mono underline leading-normal text-neutral-600 shadow-light-3 transition duration-150 ease-in-out hover:bg-neutral-200 hover:shadow-light-2 focus:bg-neutral-200 focus:shadow-light-2 focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-light-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  >
                    Login
                  </button>
                  <button
                    onClick={signupclick}
                    type="button"
                    class="inline-block rounded bg-gray-500 font-mono px-6 py-2 pb-2 pt-2.5 text-lg font-medium underline leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  >
                    Signup
                  </button>
                </>
              )}

              <div
                class="md:hidden lg:hidden cursor-pointer h-auto w-8"
                onClick={handleClick}
              >
                {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

                {isDropdownOpen ? (
                  <span className="icon">
                    <HamburgetMenuClose />{" "}
                  </span>
                ) : (
                  <span className="icon">
                    <HamburgetMenuOpen />
                  </span>
                )}
              </div>
              {isDropdownOpen && (
                <div
                  className={`absolute top-14 left-0 right-0 bg-white dark:bg-gray-900 z-10 overflow-hidden transition-all duration-300 ${
                    isDropdownOpen ? "max-h-screen" : "max-h-0"
                  }`}
                >
                  <ul className="flex flex-col items-center gap-4 py-4">
                    <li class="flex items-center h-full">
                      <NavLink exact to="/problemset" onClick={handleClick}>
                        <a
                          class="text-black  hover:scale-110 dark:text-white font-mono text-lg flex items-center h-full mt-4"
                          href="#"
                        >
                          Practice
                        </a>
                      </NavLink>
                    </li>
                    <li class="flex items-center h-full">
                      <NavLink exact to="/contest" onClick={handleClick}>
                        <a
                          class="text-black  hover:scale-110 dark:text-white font-mono text-lg flex items-center h-full mt-4"
                          href="#"
                        >
                          Contest
                        </a>
                      </NavLink>
                    </li>
                    <li class="flex items-center h-full">
                      <NavLink exact to="/problemset" onClick={handleClick}>
                        <a
                          class="text-black  hover:scale-110 dark:text-white font-mono text-lg flex items-center h-full mt-4"
                          href="#"
                        >
                          Chat
                        </a>
                      </NavLink>
                    </li>
                    <li class="flex items-center h-full">
                      <NavLink exact to="/blogs" onClick={handleClick}>
                        <a
                          class="text-black  hover:scale-110 dark:text-white font-mono text-lg flex items-center h-full mt-4"
                          href="#"
                        >
                          Blog
                        </a>
                      </NavLink>
                    </li>
                    {/* Add the remaining navbar items */}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
