import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingComponent from "../components/loading";
import Header from "../components/header";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProblemPage = () => {
  const nav = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const _id = useParams().problemid;

  const handleSubmit = () => {
    nav(`/submit/${_id}`);
  };

  console.log(_id);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/problem/${_id}`
        );
        setProblem(response.data.problem);
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [_id]);

  if (loading) {
    return <LoadingComponent />;
  }

  if (error || !problem) {
    return (
      <>
        <Header />
        <div className="error text-red-500 text-center mt-8">Problem not found</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4">
        <header className="header bg-gray-900 text-white py-5 text-center">
          <h1 className="title">{problem.title}</h1>
        </header>

        <main className="main bg-white rounded-lg shadow-md p-6 mt-4">
          <div className="constraints">
            <h2 className="section-title">Time limit {problem.timeLimit}</h2>
          </div>
          <div className="problem-statement">
            <h2 className="section-title">Problem Statement</h2>
            <p>{problem.description}</p>
          </div>
          <div className="input-output">
            <h2 className="section-title">Input</h2>
            <p>{problem.input}</p>
            <h2 className="section-title">Output</h2>
            <p>{problem.output}</p>
          </div>
        </main>
      </div>
      <button className="submitbtn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>
        Submit Code
      </button>
    </>
  );
};

export default ProblemPage;
