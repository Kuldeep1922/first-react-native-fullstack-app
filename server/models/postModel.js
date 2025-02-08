const mongoose = require("mongoose");

// Create a schema for the User model
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add post title"],
    },
    description: {
      type: String,
      required: [true, "Please add post desc.."],
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create and export the User model
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
