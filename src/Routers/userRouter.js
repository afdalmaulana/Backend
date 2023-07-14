const express = require("express")
const router = express.Router();

const userController = require("../Controllers/userController");
const { verifyToken } = require("../middleware/auth");


router.post("/auth/register", userController.postAccount)
router.get("/auth/account", userController.getAccount)
router.get("/auth/account/:id", userController.getAccountById)
router.post("/auth/login", userController.postLogin)
// router.patch("/changePassword", patchChangePassword)
// router.patch("/changePhone", patchChangePhone)
// router.patch("/resetPassword", patchResetPassword)
// router.put("/forgotPass", putForgotPassword)

module.exports = router;