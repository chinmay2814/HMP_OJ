import React, { useState, useEffect } from "react";
import axios from "axios";

function LeaderboardComponent() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/leaderboard");
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log("hi", users); // Log the current state of users after it has been updated

  return (
    <div>
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Points Earned</th>
            <th>Problems Solved</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            
            <tr key={user._id}>
              <td>{user.userName}</td>
              <td>{user.userName}</td>
              <td>{user.userName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderboardComponent;
