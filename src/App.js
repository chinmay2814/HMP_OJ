import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import Homepage from "./Pages/HomePage";
import SubmissionPage from "./Pages/SubmitPage";
import Dashboard from "./Pages/Dashboard";
const storedUser = localStorage.getItem("user");
const userData = JSON.parse(storedUser);
let userName;
if (userData && userData.user && userData.user.userName != null) {
  userName = userData.user.userName;
} else {
  userName = " ";
}
function App() {
  console.log("ssss", );
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/submit" element={<SubmissionPage />}></Route>
          <Route
            path={`/profile/${userName}`}
            element={<Dashboard />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
