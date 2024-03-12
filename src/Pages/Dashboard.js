import React, { useState, useEffect } from "react";
import axios from "axios";
const storedUser = localStorage.getItem("user");
const userData = JSON.parse(storedUser);

console.log("KAKAK",userData);
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(storedUser);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${storedUser._id}`
        );
        setUser(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : userData ? (
        <div>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <div>
                <h1>User Dashboard</h1>
                <div>
                    <p><strong>Name:</strong> {userData.user.name}</p>
                    <p><strong>Username:</strong> {userData.user.userName}</p>
                    <p><strong>Email:</strong> {userData.user.email}</p>
                    <p><strong>Problems Solved:</strong> {userData.user.questionsSolved}</p>
                    <p><strong>Points Earned:</strong> {userData.user.pointsEarned}</p>
                    <p>Last Seen :<h1 color="greeen">Online</h1></p>
                </div>
            </div>
        )}
    </div>

      ) : (
        <p>No user found</p>
      )}
    </div>
  );
};

export default Dashboard;
