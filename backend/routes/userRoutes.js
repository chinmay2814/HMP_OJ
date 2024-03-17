const express = require("express");
const router = express.Router();

const {
  allUsers,
  singleUser,
  editUser,
  deleteUser,
  updatePoints,
} = require("../controllers/userControllers");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

//routes

//admin based user data
router.get("/allusers", isAdmin, allUsers);

//leaderboard
router.get("/leaderboard", isAuthenticated, allUsers);

// user by id
router.get("/user/:id", singleUser);

//edit User
router.put("/user/edit/:id", editUser);

//delete User
router.delete("/admin/user/delete/:id", isAdmin, deleteUser);

//updatePoints
router.put("/user/updatePoints/:id", updatePoints);

module.exports = router;
