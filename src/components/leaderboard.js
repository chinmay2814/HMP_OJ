import React, { useState, useEffect } from "react";
import axios from "axios";

function LeaderboardComponent() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/allUsers"); // assuming your backend endpoint is /api/allUsers
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
              <td>{user.username}</td>
              <td>{user.points}</td>
              <td>{user.problemsSolved}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderboardComponent;
