const express = require("express");
const router = express.Router();

const { isAuthenticated, isAdmin } = require("../middleware/auth");
const {
  newproblem,
  singleProblem,
  allProblems,
} = require("../controllers/problemControllers");

//api

//create problem
router.post("/newproblem", newproblem);

//all problem
router.get("/allProblems", allProblems);

// problem by id
router.get("/problem/:id", singleProblem);

module.exports = router;
