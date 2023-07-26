const express = require("express")
const router = express.Router();
const { body, validationResult } = require('express-validator');


const userController = require("../Controllers/userController");
const { verifyToken, checkRegist } = require("../middleware/auth");
const { createUserValidator, validateRegist, loginValidator, changePasswordValidator, forgotPassValidator, resetPasswordValidator } = require("../middleware/Validator");
const forgetController = require("../Controllers/forgetPassController");


router.post("/auth/register", checkRegist, createUserValidator, validateRegist, userController.postAccount)
router.get("/auth/account", userController.getAccount)
router.get("/auth/account/:id", userController.getAccountById)
router.post("/auth/login", loginValidator, validateRegist, userController.postLogin)
router.put("/auth/forgotPassword", forgotPassValidator,validateRegist, forgetController.forgetPassword)
router.patch("/auth/resetPassword", verifyToken, resetPasswordValidator, validateRegist, forgetController.resetPassword)
router.patch("/auth/verify", verifyToken, userController.verifyAccount)


module.exports = router;