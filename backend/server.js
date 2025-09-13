const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// MongoDB connection
const mongoURI = `mongodb+srv://user1:${process.env.MONGO_PASSWORD}@cluster0.fawla.mongodb.net/HMP`;
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log("MongoDb error", err));

// Middleware
app.use(
  cors({
    origin: process.env.REACT_APP_URL,
    methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const problemRoutes = require("./routes/problemRoutes");
const blogRoutes = require("./routes/blogRoutes");

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", problemRoutes);
app.use("/api", blogRoutes);

// Error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
