const express=require("express");
const router=express.Router();

const{isAuthenticated,isAdmin}=require("../middleware/auth");
const{newproblem,singleProblem,allProblems}=require("../controllers/problemControllers");


//api

//create problem
router.post("/newproblem",isAuthenticated,newproblem);

//all problem
router.get('/allProblems', isAuthenticated,  allProblems);

// problem by id
router.get('/problem/:id', isAuthenticated, singleProblem);

module.exports = router;