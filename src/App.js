import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import Homepage from "./Pages/HomePage";
import SubmissionPage from "./Pages/SubmitPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/submit" element={<SubmissionPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
