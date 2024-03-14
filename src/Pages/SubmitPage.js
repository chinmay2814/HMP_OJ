import React, { useState, useEffect } from "react";
import Editor from "../components/editor";
import Header from "../components/header";
import "../CSS/submitPage.css";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingComponent from "../components/loading";
import Footer from "../components/footer";
import { useParams } from "react-router-dom";

function SubmissionPage() {
  const [error, setError] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState(52);
  const [problem, setProblem] = useState("");
  const [testCases, setTestCases] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resToken, setResToken] = useState([]);
  const [statusDescriptions, setStatusDescriptions] = useState([]);
  const _id = useParams().problemid;

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleProblemChange = (event) => {
    setProblem(event.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const responseData = [];
    try {
      // Fetch test cases
      const response = await axios.get(
        `http://localhost:5000/api/testProblem/${_id}`
      );
      setTestCases(response.data.testcases);

      testCases.forEach((value) => {
        const submission = {
          language_id: language,
          source_code: code,
          stdin: value.input,
          expected_output: value.output,
          // wall_time_limit: value.timeLimit,
        };

        responseData.push(submission);
      });
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }

    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
      params: {
        base64_encoded: "false",
        wait: "true",
        fields: "*",
      },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "18f758967emsh70d88d5f7e10e13p14acffjsne5bf2100c38d",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: {
        submissions: responseData,
      },
    };

    try {
      const response = await axios.request(options);
      setResToken(response.data);
    } catch (error) {
      toast.warning("response not send, try again");
      console.error(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const getTokens = async () => {
      const formattedTokens = resToken.map((obj) => obj.token).join(",");
      const gettoken = {
        method: "GET",
        url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
        params: {
          tokens: formattedTokens,
          base64_encoded: "true",
          fields: "*",
        },
        headers: {
          "X-RapidAPI-Key":
            "e78fdc0680msh8aaea3ccd6887e2p19433ajsn5317b7ca75c4",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(gettoken);
        const descriptions = response.data.submissions.map(
          (obj) => obj.status.description
        );

        setStatusDescriptions(descriptions);
        console.log(descriptions, response);
        const allAccepted = statusDescriptions.every(
          (description) => description === "Accepted"
        );
        if (allAccepted) {
          toast.success("All Testcases accepted");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (resToken.length > 0) {
      getTokens();
    }
  }, [resToken]);

  return (
    <>
      <Header />

      <div className="submitbody">
        <h2 id="submitcode">Submit your code</h2>
        <div className="editor-container">
          <label className="label">Code:</label>
          <Editor value={code} onChange={handleCodeChange} />
        </div>
        <div className="selectbody">
          <>
            <label className="label">Language:</label>
            <select
              className="select"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value={52}>C++</option>
              <option value={91}>Java</option>
              <option value={71}>Python</option>
            </select>
          </>
        </div>

        {isLoading && <LoadingComponent />}
        <button className="button" onClick={handleSubmit}>
          Submit
        </button>

        <div>
          {statusDescriptions.map((description, index) => (
            <p key={index}>
              Test Case {index + 1}:{description}
            </p>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SubmissionPage;
