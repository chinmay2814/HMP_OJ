import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      toast.error("password not matched");
    } else {
      // Reset password error state if passwords match
      setPasswordError("");
      // Proceed with form submission
      console.log(formData);
    }
    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        formData,
      });

      if (response.status === 200) {
        const user = await response.data;
        // Handle successful signup
        console.log("signup successful:", user);

        toast.success("signup successful!");
        navigate("/login");
      } else {
        // Handle signup failure

        console.error("signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
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
        <div>
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
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
