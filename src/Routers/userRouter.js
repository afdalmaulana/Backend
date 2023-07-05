const express = require("express")
const router = express.Router();

const {getAccount,postAccount, postLogin, getAccountById, patchChangeUsername, patchChangeEmail, patchChangePassword, patchChangePhone} = require("../Controllers/userController")

router.post("/register", postAccount)
router.get("/account", getAccount)
router.post("/login", postLogin)
router.get("/account/:id", getAccountById)
router.patch("/changeUsername/:id", patchChangeUsername)
router.patch("/changeEmail/:id", patchChangeEmail)
router.patch("/changePassword/:id", patchChangePassword)
router.patch("/changePhone/:id", patchChangePhone)

module.exports = router;