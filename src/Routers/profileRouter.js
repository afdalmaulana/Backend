const express = require("express");
const { profileController } = require("../Controllers");
const { verifyToken, verifyEmail, verifyUsername, verifyPhone, verifyPassword} = require("../middleware/auth");
const { multerUpload } = require("../middleware/multer");
const { changeUsernameValidator, validateRegist, changeEmailValidator, changePasswordValidator, changePhoneValidator } = require("../middleware/Validator");
const profile = express.Router();

profile.patch("/auth/changeUsername", verifyToken, verifyUsername, changeUsernameValidator, validateRegist,profileController.patchChangeUsername)
profile.patch("/auth/changeEmail", verifyToken, verifyEmail, changeEmailValidator, profileController.patchChangeEmail)
profile.patch("/auth/changePhone", verifyToken, verifyPhone,changePhoneValidator, profileController.patchChangePhone)
profile.patch("/auth/changePassword", verifyToken,verifyPassword, changePasswordValidator,validateRegist, profileController.patchChangePassword)
profile.patch("/auth/profile/changeAvatar", verifyToken, multerUpload.single("profile-picture"), profileController.patchChangeAvatar)
module.exports = profile