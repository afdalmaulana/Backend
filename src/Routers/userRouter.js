const express = require("express")
const router = express.Router();

// const {getAccount,postAccount, postLogin, getAccountById, patchChangeUsername, patchChangeEmail, patchChangePassword, patchChangePhone, patchResetPassword, putForgotPassword} = require("../Controllers/userController");

const userController = require("../Controllers/userController");


router.post("/auth/register", userController.postAccount)
router.get("/auth/account", userController.getAccount)
router.get("/auth/account/:id", userController.getAccountById)
// router.post("/login", postLogin)
// router.patch("/changeUsername", patchChangeUsername)
// router.patch("/changeEmail", patchChangeEmail)
// router.patch("/changePassword", patchChangePassword)
// router.patch("/changePhone", patchChangePhone)
// router.patch("/resetPassword", patchResetPassword)
// router.put("/forgotPass", putForgotPassword)

module.exports = router;