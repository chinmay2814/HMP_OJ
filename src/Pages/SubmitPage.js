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
  const [results, setResults] = useState([]);
  const [response, setResponse] = useState(null);
  const [tableShow, setTableShow] = useState(false);
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
      axios.defaults.withCredentials = true;
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
      if (error.response.status === 401) {
        toast.info("You are not authorized. Please log in first.");
      }
      setIsLoading(false);
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

          const allPara = response.data.submissions.map((obj) => obj);

          setResults(allPara);
          setStatusDescriptions(descriptions);
          var isAccepted = true;
          descriptions.forEach((status) => {
            if (status !== "Accepted") {
              isAccepted = false;
              return; // Exit the loop early once a status other than "Accepted" is found
            }
          });
          if (isAccepted) {
            toast.success("ALL TESTCASES PASSED");
          } else {
            toast.error("WRONG SUBMISSION");
          }
          try {
            const storedUser = localStorage.getItem("user");
            const userData = JSON.parse(storedUser);
            const problemId = _id;
            axios.defaults.withCredentials = true;
            const response = await axios.put(
              `http://localhost:5000/api/user/updatePoints/${userData.user._id}`,
              { isAccepted, problemId }
            );
            setResponse(response.data);
          } catch (error) {
            setError(error.response.data.message || "An error occurred.");
          }
        } catch (error) {
          toast.error("Please write code Correctly");
          console.error(error);
        } finally {
          setTableShow(true);
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

        {tableShow && (
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-mono font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                    TestCase
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-mono font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                    Status
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-mono font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                    Language
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-mono font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                    Time Taken
                  </th>
                  <th className="px-6 align-middle border border-solid py-3 text-xl uppercase border-l-0 border-r-0 whitespace-nowrap font-mono font-bold text-left bg-blueGray-100 text-blueGray-500 border-blueGray-200">
                    Memory Used
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((results, index) => (
                  <tr>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex items-center">
                        <span className="ml-3 font-mono font-bold NaN">
                          {index + 1}
                        </span>
                      </div>
                    </td>{" "}
                    {/* Serial number column */}
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex items-center">
                        <span className="ml-3 font-mono font-bold NaN">
                          {results.status.description}
                        </span>
                      </div>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex items-center">
                        <span className="ml-3 font-mono text-sm font-bold NaN">
                          {results.language.name}
                        </span>
                      </div>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex items-center">
                        {results.wall_time * 1000}ms
                      </div>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div className="flex items-center">
                        <i className="mr-2 text-emerald-500"></i>
                        {results.memory}kb
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default SubmissionPage;
