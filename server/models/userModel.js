const mongoose = require("mongoose");

// Create a schema for the User model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your name"],
    },
    email: {
      type: String,
      required: [true, "Please add your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: [6, "Password should be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create and export the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
