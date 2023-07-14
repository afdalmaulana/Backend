const express = require("express");
const { blogController } = require("../Controllers");
const { verifyToken } = require("../middleware/auth");
const blog = express.Router();


blog.get("/auth/blog", blogController.getBlog)
blog.get("/aut/blog/:id", blogController.getBlogById)
blog.post("/blog", verifyToken, blogController.postBlog)

module.exports = blog