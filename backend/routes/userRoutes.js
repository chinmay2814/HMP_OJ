const express = require('express');
const router = express.Router();

const {allUsers,singleUser,editUser,deleteUser}=require("../controllers/userControllers");
const{isAuthenticated,isAdmin}=require("../middleware/auth");

//routes

//admin based user data
router.get('/allusers', isAuthenticated, isAdmin, allUsers);

//leaderboard
router.get('/leaderboard',  allUsers);

// user by id
router.get('/user/:id', isAuthenticated, singleUser);

//edit User
router.put('/user/edit/:id', isAuthenticated, editUser);

//delete User
router.delete('/admin/user/delete/:id', isAuthenticated, isAdmin, deleteUser);



module.exports=router;