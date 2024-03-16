import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/ProblemPage.css"; // Import CSS file for styling
import LoadingComponent from "../components/loading";
import Header from "../components/header";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
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
  }, [_id]); // Include _id in the dependency array

  if (loading) {
    return <LoadingComponent />;
  }

  if (error || !problem) {
    return (
      <>
        <Header />
        <div className="error">Problem not found</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container">
        <header className="header">
          <h1 className="title">{problem.title}</h1>
        </header>

        <main className="main">
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
            <h2 className="section-title">Sample Input</h2>
            <p>{problem.sampleTest.input}</p>
            <h2 className="section-title">Sample Output</h2>
            <p>{problem.sampleTest.output}</p>
          </div>
        </main>
        <button className="submitbtn" onClick={handleSubmit}>
          Submit Code
        </button>
      </div>
      <Footer />
    </>
  );
};

export default ProblemPage;
