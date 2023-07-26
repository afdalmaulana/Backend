const db = require("../models")
const path = require("path")
const user = db.User;
const {Op} = db.Sequelize
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const handlebars = require("handlebars")
const fs = require("fs").promises;
const transporter = require("../helpers/transporter")

const userController = {
    verifyAccount : async(req, res) => {
        try {
            const {id} = req.user
            const users = await user.findOne({where :{id}})
            if(users.dataValues.isVerified === true) throw new Error("Already Verification / Token expired")
        await user.update({
            isVerified : true
        }, { where : {
            id
        }})
        // console.log("?",isVerified)
        return res.status(200).json({ message : "Verification success"})
        } catch (error) {
            return res.status(500).json({error : error.message})
        }
    },
    getAccountById : async (req, res)=> {
        try {
            const {id} = req.params
            const respon = await user.findOne({
                where : { id }
            });
            res.status(200).json({ message : "Get data success",data : respon })
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
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            await db.sequelize.transaction(async (t) => {
                const result = await user.create({ username, email, phone, password : hashPassword}, {transaction : t});
                const token = jwt.sign({id:result.id, username: username, email:email}, process.env.JWT_KEY, { expiresIn : "1h"})
                const redirect = `https://localhost:3000/verification/${token}`
                const data = await fs.readFile(path.resolve(__dirname, "../emails/registerEmail.html"), "utf-8")
                const tempCompile = await handlebars.compile(data);
                const tempResult = tempCompile({username, email, redirect})
                await transporter.sendMail({
                    to : email,
                    subject : "Verification Account",
                    html : tempResult })
                res.status(200).json({message : "Registrasi Success", data : [result, token]});
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message : "Registrasi Failed",
                error : error.message
            })
        }
    },
    postLogin : async(req, res) => {
        try {
            const {username,email,phone,password} = req.body
            let account = {};
            if(username){account.username = username}
            if(email){account.email = email}
            if(phone){account.phone = phone}
            const checkLogin = await user.findOne({where : account});
            if(!checkLogin) return res.status(500).json({message : "Account not defined"})
            if(!checkLogin.isVerified){return res.status(500).json({message : "Account not verify"})}
            const checkPassword = await bcrypt.compare(password, checkLogin.password)
            if(!checkPassword) return res.status(500).json({message : "Password is incorrect"})
            let payload = {
                id : checkLogin.id,
                username : checkLogin.username,
                email : checkLogin.email,
                phone : checkLogin.phone
            }
            const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn : "3h"} )
            return res.status(200).json({message : "Login Success",data : token})
        } catch (error) {
            return res.status(500).send({message:"Login Failed", error : error.message})
        }
    }
}

module.exports = userController