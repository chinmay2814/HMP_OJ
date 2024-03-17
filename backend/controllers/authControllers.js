const User = require("../models/userModels");
const ErrorResponse = require("../utils/errorResponse");

exports.signup = async (req, res, next) => {
  const { email, userName } = req.body;
  const userExist = await User.findOne({ email });
  const usernameExist = await User.findOne({ userName });
  if (userExist) {
    return next(new ErrorResponse("E-mail already registered", 420));
  }
  if (usernameExist) {
    return next(new ErrorResponse("Username already exist", 420));
  }
  try {
    const user = await User.create(req.body);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    //validation
    if (!userName) {
      return next(new ErrorResponse("please add an username", 403));
    }
    if (!password) {
      return next(new ErrorResponse("please add a password", 403));
    }

    //check user name
    const user = await User.findOne({ userName });
    if (!user) {
      return next(new ErrorResponse("invalid credentials", 400));
    }
    //check password
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return next(new ErrorResponse("invalid credentials", 400));
    }
    //console.log("user login");
    sendTokenResponse(user, 200, res);
    // return res.status(200).json({
    //    message: "success", user ,
    //    user
    //   });
  } catch (error) {
    next(error);
  }
};

const sendTokenResponse = async (user, codeStatus, res) => {
  const token = await user.getJwtToken();

  res
    .status(codeStatus)
    .cookie("token", token, { maxAge: 60 * 1000 })
    .json({
      token,
      user,
      success: true,
      role: user.role,
    });
};

// log out
exports.logout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "logged out",
  });
};

// user profile
exports.userProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");

  res.status(200).json({
    success: true,
    user,
  });
};
