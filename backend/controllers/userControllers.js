const User = require("../models/userModels");
const Problem = require("../models/problemModel");
const ErrorResponse = require("../utils/errorResponse");

//load all users
exports.allUsers = async (req, res, next) => {
  //enable pagination
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const count = await User.find({}).estimatedDocumentCount();

  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .select("-password")
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.status(200).json({
      success: true,
      users,
      page,
      pages: Math.ceil(count / pageSize),
      count,
    });
    next();
  } catch (error) {
    return next(error);
  }
};

//show single user
exports.singleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      user,
    });
    next();
  } catch (error) {
    return next(error);
  }
};

//edit user
exports.editUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      user,
    });
    next();
  } catch (error) {
    return next(error);
  }
};

//delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    res.status(200).json({
      success: true,
      message: "user deleted",
    });
    next();
  } catch (error) {
    return next(error);
  }
};

//updatePoints
exports.updatePoints = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isAccepted, problemId } = req.body;

    // Fetch the problem from the database using the problemId
    const problem = await Problem.findById(problemId);
    console.log(problemId);
    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    const { difficulty } = problem;

    let pointsToAdd = 0;
    let pointsToRemove = 0;

    if (isAccepted) {
      switch (difficulty) {
        case "hard":
          pointsToAdd = 30;
          break;
        case "medium":
          pointsToAdd = 20;
          break;
        case "easy":
          pointsToAdd = 10;
          break;
        default:
          break;
      }
    } else {
      pointsToRemove = 5;
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        $inc: {
          questionsSolved: isAccepted ? 1 : 0,
          pointsEarned: isAccepted ? pointsToAdd : -pointsToRemove,
        },
        $addToSet: {
          solvedProblems: isAccepted ? problemId : null,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      user,
    });
    next();
  } catch (error) {
    return next(error);
  }
};
