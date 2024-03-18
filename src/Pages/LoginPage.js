import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../CSS/Default.css";
import Footer from "../components/footer";

const LoginPage = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post("http://localhost:5000/api/login", {
        userName,
        password,
      });
      if (response.status === 200) {
        const user = await response.data;
        // Handle successful login
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      if (error.response.status == 400) {
        toast.info("Check your Credentials");
      } else {
        toast.error("server error");
      }
    }
  };

  return (
    <>
      <div class="bg-gray-50 font-mono text-[#333]">
        <div class="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div class="max-w-md w-full border py-8 px-6 rounded-xl shadow-lg border-gray-300 bg-white">
            <h2 class="text-center text-3xl font-extrabold">Login</h2>
            <form class="mt-10 space-y-4" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  id="username"
                  value={userName}
                  required
                  class="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-blue-500"
                  placeholder="User Name"
                  onChange={handleUsernameChange}
                />
              </div>
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  required
                  class="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-gray-500"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                />
              </div>
              <div class="flex items-center justify-between gap-4">
                <div class="flex items-center">
                  <input
                    class="h-4 w-4 ml-1 shrink-0 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                    type="checkbox"
                    id="showPasswordCheckbox"
                    checked={showPassword}
                    onChange={handleShowPasswordToggle}
                  />
                </div>
                <label htmlFor="showPasswordCheckbox" class="mr-60">
                  Show password
                </label>
              </div>
{/* 
              <button
                type="submit"
                class="w-full py-2.5 px-4 text-sm rounded text-white bg-gray-600 hover:bg-gray-700 focus:outline-none"
               
              >
                Login
              </button>
              <button
                type="submit"
                class="w-full py-2.5 px-4 text-sm rounded text-white bg-gray-600 hover:bg-gray-700 focus:outline-none"
                
              >
                Create User
              </button>
                </span>
              </a>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LoginPage;
