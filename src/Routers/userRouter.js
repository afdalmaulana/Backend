const express = require("express")
const router = express.Router();

const {getAccount,postAccount, postLogin, getAccountById, patchChangeUsername, patchChangeEmail, patchChangePassword, patchChangePhone, patchResetPassword, putForgotPassword} = require("../Controllers/userController")

router.post("/register", postAccount)
router.get("/account", getAccount)
router.post("/login", postLogin)
router.get("/account/:id", getAccountById)
router.patch("/changeUsername/", patchChangeUsername)
router.patch("/changeEmail/", patchChangeEmail)
router.patch("/changePassword/", patchChangePassword)
router.patch("/changePhone/", patchChangePhone)
router.patch("/resetPassword", patchResetPassword)
router.put("/forgotPass", putForgotPassword)

module.exports = router;