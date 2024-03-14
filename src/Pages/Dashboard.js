import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/header";
import Footer from "../components/footer";
import LoadingComponent from "../components/loading";
const storedUser = localStorage.getItem("user");
const userData = JSON.parse(storedUser);
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(userData);
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


  const getTimePassed = (createdAt) => {
    const userCreatedAt = new Date(userData.user.createdAt);
    const currentTime = new Date();

    const timeDifference = currentTime.getTime() - userCreatedAt.getTime();
    const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return `User since ${daysPassed} days`;
  };

  return (
    <>
    <Header/>
    <div>
      {loading ? (
        <LoadingComponent/>
      ) : userData ? (
        <div className="container">
          <div className="profile">
            <div className="profile-image">
              <img
                src={`https://robohash.org/${userData.user.name}?size=150x150`}
              />
            </div>
            <div className="profile-info">
              <h1>{userData.user.name}</h1>
              <h3>{userData.user.userName}</h3>
              <p>Email: {userData.user.email}</p>
            </div>
          </div>
          </div>
      ) : (
        <p>No user found</p>
      )}
      <div>Problem Solved : {userData.user.questionsSolved}</div>
      <div>Points Earned : {userData.user.points}</div>
      <div>{getTimePassed(userData.user.createdAt)}</div>
    </div>
    <Footer/>
    </>
  );
};

export default Dashboard;
