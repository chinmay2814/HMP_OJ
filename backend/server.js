const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

mongoose
  .connect("mongodb://127.0.0.1:27017/HMP_OJ_DB", {})
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log("MongoDb error", err));

app.use(
  cors({
    origin: "http://localhost:5001", // Replace with your frontend URL
    credentials: true,
  })
);
app.options("*", cors());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);
app.use(cookieParser());

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("newuser", (username) => {
    console.log(username + " joined the conversation");
    socket.broadcast.emit("update", username + " joined the conversation");
  });

  socket.on("exituser", (username) => {
    console.log(username + " left the conversation");
    socket.broadcast.emit("update", username + " left the conversation");
  });

  socket.on("chat", (message) => {
    console.log("New message:", message);
    socket.broadcast.emit("chat", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const problemRoutes = require("./routes/problemRoutes.js");
const blogRoutes = require("./routes/blogRoutes");
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", problemRoutes);
app.use("/api", blogRoutes);

// Error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
