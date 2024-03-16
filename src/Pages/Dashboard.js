import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "font-awesome/css/font-awesome.min.css";
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

    return `${daysPassed}`;
  };

  return (
    <>
      <Header />
      <div>
        {loading ? (
          <LoadingComponent />
        ) : userData ? (
          <div class="container mt-5 mb-5">
            <div class="row no-gutters">
              <div class="col-md-4 col-lg-4">
                <img
                  src={`https://robohash.org/${userData.user.name}?size =300x300`}
                />
              </div>
              <div class="col-md-8 col-lg-8">
                <div class="d-flex flex-column">
                  <div class="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
                    <h3 class="display-5">{userData.user.name}</h3>
                    <div></div>
                    <h5 class="display-10">{userData.user.userName}</h5>
                  </div>

                  <div class="p-3 bg-black text-white"></div>
                  <div class="d-flex flex-row text-white">
                    <div class="p-3 bg-primary text-center skill-block">
                      <h6>User Since</h6>
                      <h4>{userData.user.questionsSolved}</h4>
                      <h6>days</h6>
                    </div>
                    <div class="p-3 bg-primary text-center skill-block">
                      <h6>User Since</h6>
                      <h4>{userData.user.questionsSolved}</h4>
                      <h6>days</h6>
                    </div>
                    <div class="p-3 bg-success text-center skill-block">
                      <h6>Points Earned</h6>
                      <div></div>
                      <h4>{userData.user.pointsEarned}</h4>
                    </div>
                    <div class="p-3 bg-warning text-center skill-block">
                      <h6>Problems Solved </h6>
                      <h4>{getTimePassed(userData.user.createdAt)}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>No user found</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
