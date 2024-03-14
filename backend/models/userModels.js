const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//const Problem=require("../models/problemModel");
const mongoose=require('mongoose');
const { ObjectId } = mongoose.Schema;
 //
 require('dotenv').config();
 


const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        trim: true,
        required: [true, "first name is required"],
        maxlength: 32,
      },
      userName: {
        type: String,
        trim: true,
        required: [true, "userName name is required"],
        maxlength: 12,
      },
      email: {
        type: String,
        trim: true,
        required: [true, "e-mail is required"],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please add a valid email",
        ],
      },
      password: {
        type: String,
        trim: true,
        required: [true, "password is required"],
        minlength: [6, "password must have at least (6) characters"],
      },
  
      //extra data
      solvedProblems: {
        type: [{ type: ObjectId, ref: "Problem" }],
        default: [],
      },
      questionsSolved: {
        type: Number,
        default: 0,
      },
      pointsEarned: {
        type: Number,
        default: 0,
      },
    
      role: {
        type: Number,
        default: 0,
      },
    },
    { timestamps: true }
  );

//encrypting password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });

// compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
 
  // return a JWT token
  // jkey  : secret key for signing the token
  // expiresIn : time after which the token will be invalidated in seconds
  const jkey="jwtPrivateKey";

  userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, jkey, {
      expiresIn: 3600,
    });
  };
  

module.exports=mongoose.model("User",userSchema);