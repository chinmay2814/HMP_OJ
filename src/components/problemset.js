import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingComponent from "./loading";
import { useNavigate } from "react-router-dom";
import "../CSS/Problemset.css";

const ProblemList = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/allProblems"
        );
        setProblems(response.data.problems);
        setPage(response.data.page);
        setPages(response.data.pages);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    };

    fetchProblems();
  }, [page]);

  const handlenavigation = (problemID) => {
    // Use the `navigate` function to navigate to the problem page
    console.log(problemID);
    navigate(`/problem/${problemID}`);
  };

  return (
    <div className="problem-list-container">
      <h1>Problems List</h1>
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : (
        <div>
          <div className="problemset-container">
            <h1 className="problemset-heading">Problem Set</h1>
            <div className="problemset-table-container">
              <table className="problemset-table">
                <thead>
                  <tr>
                    <th>Serial No.</th>
                    <th>Title</th>
                    <th>Difficulty</th>
                    <th>Time Limit</th>
                  </tr>
                </thead>
                <tbody>
                  {problems.map((problem, index) => (
                    <tr
                      key={problem._id}
                      onClick={() => handlenavigation(problem._id)}
                    >
                      <td>{index + 1}</td>
                      <td>{problem.title}</td>
                      <td>{problem.difficulty}</td>
                      <td>{problem.timeLimit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="pagination-buttons">
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous
            </button>
            <button onClick={() => setPage(page + 1)} disabled={page === pages}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemList;
