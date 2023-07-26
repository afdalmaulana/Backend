const jwt = require("jsonwebtoken")
const db = require("../models")
const user = db.User;
const bcrypt = require("bcrypt")

const verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    if(!token){
        return res.status(500).send("Invalid Token")
    }
    try {
        token = token.split(" ")[1];
        if(token === "null" || !token){
            return res.status(500).send("Access Denied")
        }
        let verifiedUser = jwt.verify(token, process.env.JWT_KEY)
        if(!verifiedUser){
            return res.status(500).send("Unathorized request")
        }
        req.user = verifiedUser;
        console.log("ini apa?",req.user);
        next();
    } catch (error) {
        return res.status(500).send("Invalid Token")
    }
}
const verifyUsername = async (req, res, next) => {
        const {id,username} = req.user
        const {newUsername, currentUsername} = req.body
        if(newUsername === currentUsername){
            return res.status(200).json({message : "Please select other username"})
        }
        if(username !== currentUsername){
            return res.status(200).json({message : "Invalid Username"})
        }
        const isUsernameExist = await user.findOne({
            where : { 
                id 
            }
        })
        if(!isUsernameExist){
            return res.status(200).json({message: "Username not found"})
        }
            next();
}
const verifyEmail = async (req, res, next) => {
    const {id,email} = req.user
    const {currentEmail, newEmail} = req.body
    if(currentEmail === newEmail){
        return res.status(200).json({
            message : "Please select other email"
        })
    }
    if(email !== currentEmail){
        return res.status(200).json({message : "Invalid email address"})
    }
    const isEmailExist = await user.findOne({
        where : {
            id
        }
    })
    if(!isEmailExist){
        return res.status(200).json({
            message : "Invalid Email"
        })
    }
    next();
}

const verifyPhone = async (req, res, next) => {
    const {id,phone} = req.user
    const {currentPhone, newPhone} = req.body
    if(currentPhone === newPhone){
        return res.status(200).json({
            message : "Please select other phone number" })
    }
    if(phone !== currentPhone){
        return res.status(200).json({message : "Invalid phone number"})
    }
    const isPhoneExist = await user.findOne({
        where : {
            id
        }
    })
    if(!isPhoneExist){
        return res.status(200).json({
            message : "Invalid phone"
        })
    }
    next();
}
const verifyPassword = async (req, res, next) => {
    const {id} = req.user
    const {currentPassword, newPassword, confirmPassword} = req.body
    const account = await user.findOne({where : {id}})
    const checkPassword = await bcrypt.compare(currentPassword, account.password)
    if(!checkPassword) return res.status(500).json({message : "Incorrect Password"})
    if(currentPassword === newPassword)
            return res.status(200).json({
                message : "Old password cannot be same as new password"
            })
    const users = await user.findOne({
            where : {id}
        })
        const checkOldPassword = await bcrypt.compare(currentPassword, users.password)
    if(!checkOldPassword)return res.status(200).json({message : "Incorrect password"})
    next();
}

const checkRegist = async (req, res, next) => {
    const {username, email, phone, password, confirmPassword} = req.body
            if(password !== confirmPassword){
                return res.status(500).json({message : "Password not match"})
            }
            const isUsernameExist = await user.findOne({
                where : { username : username }
            })
            if(isUsernameExist)
                return res.status(200).json({message: "Username Already Exist"})
            const isEmailExist = await user.findOne({
                where : { email : email }
            })
            if(isEmailExist)
                return res.status(200).json({ message : "Email Already Exist"})
            const isPhoneExist = await user.findOne({
                where : { phone : phone }
            })
            if(isPhoneExist)
                return res.status(200).json({message : "Phone already exist"})
            next();
}


module.exports = {verifyToken, verifyUsername, verifyEmail, checkRegist, verifyPhone, verifyPassword}
// module.exports = createUserValidator;