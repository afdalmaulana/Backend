const express = require("express");
const { getCategory } = require("../Controllers/categoryController");
const router = express.Router();

router.get("/category", getCategory);

module.exports = router;