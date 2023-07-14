const db = require("../models")
const user = db.User;
const {op} = db.sequelize
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userController = {
    getAccountById : async (req, res)=> {
        try {
            const {id} = req.params
            const respon = await user.findOne({
                where : {
                    id
                }
            });
            res.status(200).json({
                message : "Get data success",
                data : respon
            })
        } catch (error) {
            res.status(500).send({
                message:"Get data failed",
            error : error.message})
        }
    },
    getAccount: async (req,res) => {
        try {
            const result = await user.findAll()
            res.status(200).json({
                message : "Get data success",
                data : result
            })
        } catch (error) {
            res.status(500).send({
                message:"Get data failed",
                error : error.message
            })
        }
    },
    postAccount: async (req,res) => {
        try {
            const {username, email, phone, password, confirmPassword} = req.body
            if(password !== confirmPassword){
                return res.status(500).json({
                    message : "Password not match"
                })
            }
            const isEmailExist = await user.findOne({
                where : {
                    email : email
                }
            })
            if(isEmailExist){
                return res.status(200).json({
                    message : "Email Already Exist"
                })
            }
            const salt = await bcrypt.genSalt(10);
            console.log("ini salt",salt)
            const hashPassword = await bcrypt.hash(password, salt);
            await db.sequelize.transaction(async (t) => {
                const result = await user.create({
                    username,
                    email,
                    phone,
                    password : hashPassword
                }, {transaction : t});
                res.status(200).json({
                    message : "Registrasi Success",
                    data : result
                });
            })

        } catch (error) {
            return res.status(500).json({
                message : "Registrasi Failed",
                error : error.message
            })
        }
    },
    postLogin : async(req, res) => {
        try {
            const {username, password} = req.body
            const checkLogin = await user.findOne({
                where : {
                    username,
                    // password
                }
            });
            console.log(checkLogin);
            if(!checkLogin){
                return res.status(500).json({
                    message : "Account not defined"
                })
            }
            const isValid = await bcrypt.compare(password, checkLogin.password)
            if(!isValid){
                return res.status(500).json({
                    message : "Password is incorrect"
                })
            }
            let payload = {
                id : checkLogin.id,
                username : checkLogin.username,
                email : checkLogin.email,
                phone : checkLogin.phone
            }
            const token = jwt.sign(payload, process.env.JWT_KEY,
                {
                    expiresIn : "1h"
                })
            return res.status(200).json({
                message : "Login Success",
                data : token
            })
        } catch (error) {
            return res.status(500).send({
                message:"Login Failed",
                error : error.message
            })
        }
    }

}

// const patchChangeUsername = async (req, res) => {
//     try {
//         // const {id} =req.params
//         const {currentUsername, newUsername} = req.body
//         const {data} = await axios.patch(
//         `${url}/user`, {
//             currentUsername,
//             newUsername
//         }
//         )
//         res.status(200).send("Username Change")
//     } catch (error) {
//         res.status(500).send({message:"Username not change"})
//     }
// }

// const patchChangePassword = async (req, res) => {
//     try {
//         // const {id} = req.params
//         const {currentPassword, newPassword, confirmPassword} = req.body
//         const respon = await axios.patch(
//             `${url}/user`, {
//                 currentPassword,
//                 newPassword,
//                 confirmPassword
//             }
//         )
//         res.status(200).send("Password Change")
//     } catch (error) {
//         res.status(500).send({message: "Password not change "})
//     }
// }

// const patchChangeEmail = async (req, res) => {
//     try {
//         const {currentEmail, newEmail} = req.body
//         const respon = await axios.patch(
//             `${url}/user`, {
//                 currentEmail,
//                 newEmail
//             }
//         )
//         res.status(200).send("Email Change")
//     } catch (error) {
//         res.status(500).send({message:"Email not change"})
//     }
// }

// const patchChangePhone = async (req, res) => {
//     try {
//         // const {id} = req.params
//         const {currentPhone, newPhone} = req.body
//         const respon = await axios.pacth(
//             `${url}/user`, {
//                 currentPhone,
//                 newPhone
//             }
//         )
//         res.status(200).send("Phone Change")
//     } catch (error) {
//         res.status(500).send({message: "Phone not Change"})
//     }
// }

// const patchResetPassword = async (req, res) => {
//     try {
//         const {password, confirmPassword} = req.body
//         const respon = await axios.get(
//             `${url}/user`, {
//                 password,
//                 confirmPassword
//             }
//         )
//         res.status(200).json({
//             message: "Reset Password Success",
//             data: respon
//         })
//     } catch (error) {
//         res.status(500).send({message:"Errorrsss"})
//     }
// }

// const putForgotPassword = async (req, res) => {
//     try {
//         const {email} = req.body
//         const respon = await axios.put(
//             `${url}/user`, {
//                 email
//             }
//         )
//         res.status(200).json({
//             message : "Check your email for change password"
//         })
//     } catch (error) {
//         res.status(500).send({message:"email not found"})
//     }
// }

module.exports = userController