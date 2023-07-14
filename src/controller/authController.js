const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("../models")
const user = db.user

const authController = {
    register : async (req,res) => {
        try {
            const {username, email, password} = req.body;
            const result = await user.findOne({
                where : {
                    email : email,
                }
            })
            if(isEmailExist){
                return res.status(200).json({
                    message : "Email already exist"
                })
            }
            await db.sequelize.transaction(async (t) => {
                const result = await user.create({
                    username,
                    email,
                    password
                }, {transaction : t});
                return res.status(200).json({
                    message : "Registrasi Success",
                    data : result
                })
            })
        } catch (error) {
            return res.status(500)
        }
    },
    login : async (req, res) => {
        try {
            const {email, password} = req.body;
            const checkLogin = await user.findOne({
                where : {
                    email,
                    password
                }
            })
            if(!checkLogin){
                return res.status(200).json({
                    message : "Login Failed"
                })
            }
            return res.status(200).json({
                message : "Login Success",
                data : checkLogin
            })
        } catch (error) {
            
        }
    }
}