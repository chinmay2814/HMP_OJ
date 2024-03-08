const express=require("express");
const router=express.Router();

//api calling
const {signup,login}=require("../controllers/authControllers")

//routes

//signup
router.post("/signup",signup);

//login
router.post("/login",login);

module.exports = router;



