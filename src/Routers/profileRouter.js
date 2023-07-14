const express = require("express");
const { profileController } = require("../Controllers");
const { verifyToken } = require("../middleware/auth");
const profile = express.Router();

profile.patch("/auth/changeUsername", verifyToken, profileController.patchChangeUsername)
profile.patch("/auth/changeEmail", verifyToken, profileController.patchChangeEmail)
profile.patch("/auth/changePhone", verifyToken, profileController.patchChangePhone)
profile.patch("/aut/changePassword", verifyToken, profileController.patchChangePassword)
module.exports = profile