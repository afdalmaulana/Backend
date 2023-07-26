const express = require("express");
const { blogController } = require("../Controllers");
const { verifyToken } = require("../middleware/auth");
const { multerUpload } = require("../middleware/multer");
const blog = express.Router();
const path = require("path")


blog.get("/auth/blog", blogController.getBlog)
blog.get("/auth/blog/:id", blogController.getBlogById)
blog.post("/auth/blog/createBlog", verifyToken,multerUpload.single("imgBlog"), blogController.postBlog)
blog.get("/auth/category", blogController.getCategory)
blog.get("/auth/country", blogController.getCountry)

module.exports = blog