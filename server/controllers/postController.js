const mongoose = require("mongoose");
const Post = require("./../models/postModel.js"); // Adjust the path as needed

const createPostController = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPost = await Post.create({
      title,
      description,
      postedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getAllPostController = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "_id name")
      .sort({ createdAt:-1 });
    res.status(200).json({
      success: true,
      message: "all post data fetched",
      data: posts,
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    res.status(500).json({ success: false, error });
  }
};

module.exports = {
  createPostController,
  getAllPostController,
};
