const express = require("express");
const { isAuthenticated } = require("../controllers/userController");
const {
  createPostController,
  getAllPostController,
} = require("../controllers/postController");
const router = express.Router();

router.post("/create-post", isAuthenticated, createPostController);
router.get("/get-all-post", isAuthenticated, getAllPostController);

module.exports = router;
