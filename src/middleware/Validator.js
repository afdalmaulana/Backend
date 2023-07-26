const {body, validationResult} = require("express-validator")

const createUserValidator = [
    body("username").notEmpty().withMessage("Username cannot be empty")
    .matches(/^.*(?=.{6,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)
    .withMessage("Username must contain at least 6 characters, one uppercase, one number"),
    body("email").notEmpty().withMessage("Email cannot be empty")
    .isEmail().withMessage("Invalid email address format"),
    body("phone").notEmpty().withMessage("Phone cannot be empty")
    .isLength({min : 10, max: 12}).withMessage("Phone must have min 10 number and max 12"),
    body("password").notEmpty().withMessage("Password cannot be empty")
    .matches(/^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)
    .withMessage("Password must contain 6 character, one uppercase, one number, and one special case character"),
    body("confirmPassword").notEmpty().withMessage("cannot be empty")
]

const loginValidator = [
  body("password").notEmpty().withMessage("Password cannot empty"),  
  body("username")
    .if(body("username").exists())
      .exists().withMessage("Username cannot be empty")
      .matches(/^.*(?=.{6,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)
      .withMessage("Username must contain at least 6 characters, one uppercase, one number"),
    body("email")
    .if(body("email").exists())
      .exists().withMessage("Email cannot be empty")
      .isEmail().withMessage("Invalid email address format"),
    body("phone")
    .if(body("phone").exists())
    .exists().withMessage("Phone number cannot empty")
    .isLength({min : 10, max : 12}).withMessage("Phone must have min 10 number and max 12 number")
]

const changePasswordValidator = [
  body("currentPassword").notEmpty().withMessage("Password cannot be empty"),
  body("newPassword").notEmpty().withMessage("Password cannot be empty")
    .matches(/^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)
    .withMessage("Password must contain 6 character, one uppercase, one number, and one special case character"),
  body("confirmPassword").custom((confirmPassword, {req}) => {
    if(confirmPassword !== req.body.newPassword){
      throw new Error("Password not match")
    }
    return true
  })
]
const resetPasswordValidator = [
  body("newPassword").notEmpty().withMessage("Password cannot be empty")
    .matches(/^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)
    .withMessage("Password must contain 6 character, one uppercase, one number, and one special case character"),
  body("confirmPassword").custom((confirmPassword, {req}) => {
    if(confirmPassword !== req.body.newPassword){
      throw new Error("Password not match")
    }
    return true
  })
]


const changeUsernameValidator = [
  body("newUsername").notEmpty().withMessage("Username cannot be empty")
  .matches(/^.*(?=.{6,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)
  .withMessage("Username must contain at least 6 characters, one uppercase, one number"),
]

const changeEmailValidator = [
  body("newEmail").notEmpty().withMessage("Email cannot be empty")
  .isEmail().withMessage("Invalid email address format"),
]

const forgotPassValidator = [
  body("email").notEmpty().withMessage("Email cannot be empty")
  .isEmail().withMessage("Invalid email address format"),
]

const changePhoneValidator = [
  body("newPhone").notEmpty().withMessage("Phone cannot be empty")
  .isLength({min : 10, max : 12}).withMessage("Phone must have min 10 number and max 12 number")
]

const validateRegist = (req, res, next) => {
  const errors = validationResult(req);
//   validationResult memiliki method isEmpty untuk mengembalikan nilai true/false
  if (errors.isEmpty() === false) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateRegist, 
  createUserValidator, 
  changeUsernameValidator,
  changeEmailValidator,
  loginValidator,
  changePasswordValidator,
  changePhoneValidator,
  forgotPassValidator,
  resetPasswordValidator
}

