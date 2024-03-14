const express = require("express");
const router = express.Router();

const { isAuthenticated, isAdmin } = require("../middleware/auth");
const {
  newproblem,
  singleProblem,
  allProblems,
  testProblem,
} = require("../controllers/problemControllers");

//api

//create problem
router.post("/newproblem", newproblem);

//all problem
router.get("/allProblems", allProblems);

//testcase of  problem
router.get("/testProblem/:id", testProblem);

// problem by id
router.get("/problem/:id", singleProblem);

module.exports = router;
