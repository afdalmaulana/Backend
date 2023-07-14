const db = require("../models")
const user = db.User;
const jwt = require("jsonwebtoken")

const profileController = {
    patchChangeUsername : async(req, res) => {
        try {
            const {newUsername, currentUsername} = req.body
            if(newUsername === currentUsername){
                return res.status(200).json({
                    message : "Please select other username"
                })
            }
            const isUsernameExist = await user.findOne({
                where : {
                    username : newUsername
                }
            })
            if(isUsernameExist){
                return res.status(200).json({
                    message: "Username Already Exist"
                })
            }
            await db.sequelize.transaction(async (t) => {
                const result = await user.update({
                    username : newUsername,
            }, {transaction : t});
            return res.status(200).json({
                message : "Username change",
                data : result
                })
            })
        } catch (error) {
            res.status(500).send({
                message : "Update data failed",
                error : error.message
            })
        }
    },
    patchChangeEmail : async(req, res) =>{
        try {
            const {currentEmail, newEmail} = req.body
            if(currentEmail === newEmail){
                return res.status(200).json({
                    message : "Please select other email"
                })
            }
            const isEmailExist = await user.findOne({
                where : {
                    email : newEmail
                }
            })
            if(isEmailExist){
                return res.status(200).json({
                    message : "Email Already Exist"
                })
            }
            await db.sequelize.transaction(async(t) => {
                const result = await user.update({
                    email : newEmail,
                }, {transaction : t});
                return res.status(200).json({
                    message : "Email is change",
                    data : result,
                })
            })
        } catch (error) {
            return res.status(500).json({
                message : "Email is not change",
                error : error.message
            })
        }
    },
    patchChangePhone : async (req, res) => {
        try {
            const {currentPhone, newPhone} = req.body
        if(currentPhone === newPhone){
            return res.status(200).json({
                message : "Please select other phone number"
            })
        }
        const isPhoneExist = await user.findOne({
            where : {
                phone : newPhone
            }
        })
        if(isPhoneExist){
            return res.status(200).json({
                message : "Phone already exist"
            })
        }
        await db.sequelize.transaction(async (t) => {
            const result = await user.update({
                phone : newPhone,
            }, { transaction : t});
            return res.status(200).json({
                message : "Phone change",
                data : result,
            })
        })
        } catch (error) {
            return res.status(500).json({
                message : "Phone not change",
                error : error.message
            })
        }
        
    },
    patchChangePassword : async(req, res) => {
        const {currentPassword, newPassword} = req.body
        if(currentPassword === newPassword){
            return res.status(200).json({
                message : "Please select other password"
            })
        }
    }
}
module.exports = profileController;