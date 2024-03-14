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
    setStatusDescriptions([]);
    try {
      // Fetch test cases
      setStatusDescriptions([]);
      const response = await axios.get(
        `http://localhost:5000/api/testProblem/${_id}`
      );

      if (response && response.data && response.data.testcases) {
        const testCases = response.data.testcases;
        const responseData = [];

        testCases.forEach((value) => {
          const submission = {
            language_id: language,
            source_code: code,
            stdin: value.input,
            expected_output: value.output,
            wall_time_limit: value.timeLimit,
          };

          responseData.push(submission);
        });

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
            "X-RapidAPI-Key":
              "e78fdc0680msh8aaea3ccd6887e2p19433ajsn5317b7ca75c4",
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
          toast.warning("Response not sent. Please try again.");
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        console.error("Error fetching test cases or response data is invalid.");
      }
    } catch (error) {
      setError(error.response.data.message || "An error occurred.");
      console.error(error);
    }
  };

  useEffect(() => {
    const getTokens = async () => {
      // Function to be executed after the delay

      const delayedFunction = async () => {
        setIsLoading(true);
        const formattedTokens = resToken.map((obj) => obj.token).join(",");
        const gettoken = {
          method: "GET",
          url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
          params: {
            tokens: formattedTokens,
            base64_encoded: "false",
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
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      // Delay before executing the function
      setTimeout(delayedFunction, 2000); // 2000 milliseconds = 2 seconds
    };

    if (resToken.length > 0) {
      getTokens();
    }
  }, [resToken]);
  useEffect(() => {
    // Count the number of accepted submissions
    const updatePointsAPI = async (id, isAccepted, problemId) => {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/updatePoints/${id}`,
          {
            isAccepted,
            problemId,
          }
        );
        return response.data; // Return the data received from the API
      } catch (error) {
        throw error; // Throw the error to handle it in the calling function
      }
    };

    // Check if testCases is not null or undefined
    if (testCases && testCases.length > 0) {
      const acceptedCount = statusDescriptions.filter(
        (description) => description === "Accepted"
      ).length;

      // Log or use the count as needed
      let isAccepted = false;
      if (acceptedCount === testCases.length) {
        toast.success("ALL TESTCASES PASSED");
        isAccepted = true;
      }
      const storedUser = JSON.parse(localStorage.getItem("user"));
      console.log("Number of accepted submissions:", acceptedCount, storedUser);
      // Call updatePointsAPI and await its execution
      updatePointsAPI(storedUser._id, isAccepted, _id);
    }
  }, [statusDescriptions, testCases]);

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
