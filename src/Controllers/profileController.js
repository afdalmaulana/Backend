const db = require("../models")
const user = db.User;
const handlebars = require("handlebars")
const transporter = require("../helpers/transporter")
const bcrypt = require("bcrypt")
const fs = require("fs").promises;
const path = require("path")
const jwt = require("jsonwebtoken")

const profileController = {
    patchChangeUsername : async(req, res) => {
        try {
            const {id} = req.user
            const {newUsername, currentUsername} = req.body
            await db.sequelize.transaction(async (t) => {
            const result = await user.update({ username : newUsername,
            },{where : {id}}, { transaction : t});
            const data = await fs.readFile(path.resolve(__dirname, "../emails/changeUsername.html"), "utf-8")
            const tempCompile = await handlebars.compile(data);
            const tempResult = tempCompile({newUsername, currentUsername})
            await transporter.sendMail({
                to : req.user.email,
                subject : "Change Username",
                html : tempResult
            })
                    return res.status(200).json({message : "Change username success"})
            })
        } catch (error) {
            res.status(500).send({
                message : "Username already exist",
                error : error.message
            })
        }
    },
    patchChangeEmail : async(req, res) =>{
        try {
            const {id, username} = req.user
            const {currentEmail, newEmail} = req.body
            await db.sequelize.transaction(async (t) => {
                const result = await user.update({email : newEmail, isVerified : false,},{where : {id}}, { transaction : t});
                let payload = {
                    id : id,
                    username : username,
                    email : newEmail,
                }
                const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn : "2h"})
                const redirect = `https://localhost:3000/verification/${token}`
                const data = await fs.readFile(path.resolve(__dirname, "../emails/changeEmail.html"), "utf-8")
                const tempCompile = await handlebars.compile(data);
                const tempResult = tempCompile({username, newEmail, currentEmail, redirect})
                await transporter.sendMail({
                    to : newEmail,
                    subject : "Change Email",
                    html : tempResult
                })
                return res.status(200).json({message : "Change email success", data : token})
            })
        } catch (error) {
            return res.status(500).json({message : "Email Already Exist", error : error.message})
        }
    },
    patchChangePhone : async (req, res) => {
        try {
            const {id} = req.user
            const {currentPhone, newPhone} = req.body
            await db.sequelize.transaction(async (t) => {
            const result = await user.update({phone : newPhone},
                {where : {id} }, { transaction : t});
            const data = await fs.readFile(path.resolve(__dirname, "../emails/changePhone.html"), "utf-8")
            const tempCompile = await handlebars.compile(data);
            const tempResult = tempCompile({newPhone,currentPhone})
            await transporter.sendMail({
                to : req.user.email,
                subject : "Change Phone Number",
                html : tempResult
            })
            return res.status(200).json({ message : "Change phone number success" })
        })
        } catch (error) {
            return res.status(500).json({message : "Phone not change",error : error.message})
        }
    },
    patchChangePassword : async(req, res) => {
        const {currentPassword, newPassword, confirmPassword} = req.body
        const {id,username} = req.user
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(newPassword, salt);
            const update = await user.update(
                { password : hashPassword},
                {where : {id}}
            );
            const data = await fs.readFile(path.resolve(__dirname, "../emails/changePassword.html"), "utf-8")
            const tempCompile = await handlebars.compile(data);
            const tempResult = tempCompile({username})
            await transporter.sendMail({
                to : req.user.email,
                subject : "Change Password",
                html : tempResult
            })
            return res.status(200).json({ success : "Change password success"})
        } catch (error) {
            return res.status(500).json({message : "Invalid", error : error.message})
        }
    },
    patchChangeAvatar : async (req, res) => {
        try {
            const { id } = req.user;
            const tujuan = req.file.path
            console.log(tujuan)
            console.log("ini usernya => ",req.user);
            const oldPicture = await user.findOne({ where : {id} })
            if(oldPicture.img){
                fs.unlink(oldPicture.img, (err) => {
                    if(err) return res.status(500).json({error : err.message})
                })
            }
            await db.sequelize.transaction( async (t) => {
                const result = await user.update({
                    img : req.file.path
                }, {
                    where : { id }
                }, {transaction : t })
                return res.status(200).json({ message : "Change Avatar success" })
            })
        } catch (error) {
            return res.status(500).json({ message: "Failed", error : error.message})
        }
    }
}
module.exports = profileController;