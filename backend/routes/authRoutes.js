const express=require("express");
const router=express.Router();

//api calling
const {signup,login,logout,userProfile}=require("../controllers/authControllers");
const {isAuthenticated}=require("../middleware/auth")

//routes

//signup
router.post("/signup",signup);

//login
router.post("/login",login);

//logout
router.get("/logout",logout);

//profile
router.get("/me", isAuthenticated, userProfile);


module.exports = router;



