const User = require("../models/userModel"); // Assuming User model is in the models folder
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
// Dummy secret key for JWT, in production use environment variables
const JWT_SECRET = process.env.SECRETE_KEY;

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Please add email, name, and password" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Save user to the database
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Please add email and password" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        id: user._id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Find the user by ID
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;

    // If password is provided, hash it before updating
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    // Save the updated user data
    await user.save();

    res.status(200).json({
      message: "User updated successfully..Please Login Again!!!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// isAuthenticated midd function

const isAuthenticated = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const token = req.header("Authorization");

    // Check if token exists
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    // Remove "Bearer " if it exists and extract the token
    const tokenWithoutBearer = token.startsWith("Bearer ")
      ? token.slice(7)
      : token;

    // Verify the token
    const decoded = jwt.verify(tokenWithoutBearer, JWT_SECRET);

    // Fetch user from the database using the userId stored in the token
    const user = await User.findById(decoded.userId).select("-password"); // Exclude password field

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach full user details to request
    req.user = user;

    console.log("Authenticated User:", user);

    // res.status(200).json({
    //   message: "User authenticated",
    //   user,
    // });

    // Uncomment below line if you want to proceed to the next middleware
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token is not valid" });
  }
};


module.exports = {
  registerUser,
  loginUser,
  updateUser,
  isAuthenticated,
};
