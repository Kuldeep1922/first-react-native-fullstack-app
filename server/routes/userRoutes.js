const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
  isAuthenticated,
} = require("../controllers/userController"); // Importing controller functions

// Register a new user
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

router.put("/update-user", isAuthenticated, updateUser);

module.exports = router;
