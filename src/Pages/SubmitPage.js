import React, { useState } from "react";
import Editor from "../components/editor"; // Assuming your Editor component is located in '../components/Editor'
import Header from "../components/header";
import "./submitPage.css";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingComponent from "../components/loading";
import Footer from "../components/footer";
function SubmissionPage() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [problem, setProblem] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleProblemChange = (event) => {
    setProblem(event.target.value);
  };

  const handleSubmit = () => {
    // Log the code, language, and problem ID
    setIsLoading(true);
    console.log("Code:", code);
    console.log("Language:", language);
    console.log("Problem:", problem);
    if (language === "cpp") {
      setLanguage(52);
    }
    if (language === "java") {
      setLanguage(91);
    }
    if (language === "python") {
      setLanguage(71);
    }
    const exout = "7";

    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: {
        base64_encoded: "false",
        wait: "true",
        fields: "*",
      },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "e78fdc0680msh8aaea3ccd6887e2p19433ajsn5317b7ca75c4",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: {
        language_id: language,
        source_code: code,
        stdin: "1\n8 2 3 \n",
        expected_output: "Barbossa\n",
      },
    };

    const sendCodeToCompiler = async () => {
      try {
        const response = await axios.request(options);
        console.log(response.data);
        if (response.data.stdout === response.data.expected_output) {
          console.log("toast");
          toast.success("Correct output");
        } else {
          toast.error("wrong output");
        }
        console.log(response.data.stdout === response.data.expected_output); //prints the output of the program
      } catch (error) {
        toast.warning("response not send, try again");
        console.error(error);
      }
      setIsLoading(false);
    };

    sendCodeToCompiler();
  };

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
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
            </select>
          </>
          <>
            <label className="label">Problem ID:</label>
            <select
              className="select"
              value={problem}
              onChange={handleProblemChange}
            >
              <option value="problem1">Problem 1</option>
              <option value="problem2">Problem 2</option>
              <option value="problem3">Problem 3</option>
              {/* Add more problem options as needed */}
            </select>
          </>
        </div>
        {/* Conditional rendering of LoadingComponent */}
        {isLoading && <LoadingComponent />}
        <button className="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <Footer />
    </>
  );
}

export default SubmissionPage;
