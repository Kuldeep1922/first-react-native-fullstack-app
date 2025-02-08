// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");

connectDB();
dotenv.config();

const app = express();

const port = process.env.PORT || 8080;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// A simple route for testing
app.get("/", (req, res) => {
  res.send("Running");
});

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/post", postRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running at PORT: ${port}`.bgBlue.red);
});
