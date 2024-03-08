const express=require("express");
const router=express.Router();

//api calling
const {signup}=require("../controllers/authControllers")

//routes

//signup
router.post("/signup",signup);

module.exports = router;



