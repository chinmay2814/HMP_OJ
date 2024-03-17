import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "../CSS/LoginPage.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      toast.error("Passwords do not match");
    } else {
      setPasswordError(""); // Reset password error state if passwords match
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          "http://localhost:5000/api/signup",
          formData
        );

        if (response.status === 200) {
          const user = response.data;
          // Handle successful signup
          console.log("signup successful:", user);
          toast.success("Signup successful!");
          navigate("/login");
        } else {
          // Handle signup failure
          console.error("Signup failed");
          toast.error("Signup failed");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error occurred during signup");
      }
    }
  };

  return (
    <>
      <div className="loginbody">
        <div className="wrapper">
          <div className="form-box login">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <label htmlFor="userName">userName:</label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </div>

              {passwordError && (
                <p className="error-message">{passwordError}</p>
              )}

              <button type="submit" className="btn">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
