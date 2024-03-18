import "./App.css";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import Homepage from "./Pages/HomePage";
import SubmissionPage from "./Pages/SubmitPage";
import Dashboard from "./Pages/Dashboard";
import ProblemSet from "./Pages/ProblemSet";
import DefaultPage from "./Pages/Default";
import ProblemPage from "./Pages/ProblemPage";
import BlogPage from "./Pages/Blogs";
import ProblemForm from "./Pages/CreateProblem";

import BlogShow from "./Pages/BlogShow";
import AddBlogForm from "./components/blogAdd";
import BlogCreate from "./Pages/CreateBlog";
import Chatroom from "./Pages/Chat";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/" element={<Homepage />}></Route>
          <Route
            path={`/submit/:problemid`}
            element={<SubmissionPage />}
          ></Route>
          <Route path="/blogs" element={<BlogPage />}></Route>
          <Route path={"/blog/:blogid"} element={<BlogShow />}></Route>
          <Route path={`/profile/:username`} element={<Dashboard />}></Route>
          <Route path="/problemset" element={<ProblemSet />}></Route>
          <Route path={`/problem/:problemid`} element={<ProblemPage />}></Route>
          <Route path={"/createblog"} element={<BlogCreate />}></Route>
          <Route path={"/createProblem"} element={<ProblemForm />}></Route>
          <Route path="/chat" element={<Chatroom />}></Route>
          <Route path="*" element={<DefaultPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
