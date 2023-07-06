const express = require("express");
const { getBlog, postBlog, getBlogById } = require("../Controllers/blogController");
const blog = express.Router();


blog.get("/blog", getBlog)
blog.get("/blog/:id", getBlogById)
blog.post("/blog", postBlog)

module.exports = blog