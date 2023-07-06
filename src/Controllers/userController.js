const axios = require("axios")
const url = process.env.JSON_SERVER_URL;

const getAccount = async (req,res) => {
    try {
        const respon = await axios.get(
            `${url}/user`
        )
        res.status(200).send(respon.data)

    } catch (error) {
        res.statu(500).send({message:"Error"})
    }
}

const getAccountById = async (req, res)=> {
    try {
        const {id} = req.params
        const respon = await axios.get(
            `${url}/user/${id}`
        )
        res.status(200).send(respon.data)
    } catch (error) {
        req.status(500).send({message:"ERROR"})
    }
}

const postAccount = async (req, res) => {
    try {
        const {username, email, phone, password, confirmPassword} = req.body
        const {data} = await axios.post(
            `${url}/user`, {
                username,
                email,
                phone,
                password,
                confirmPassword
            }
        )
        res.status(200).json({
            message: "Register Success",
            data
        })
    } catch (error) {
        res.status(500).send({message:"error"})
    }
}

const postLogin = async (req, res) => {
    try {
        const {username, email, phone, password} = req.body
        const {data} = await axios.post(
            `${url}/user`, {
                username,
                email, 
                phone,
                password
            }
        )
        res.status(200).json({
            message : "Welcome",
            data
        })
    } catch (error) {
        res.status(500).send({message:"Error"})
    }
}

const patchChangeUsername = async (req, res) => {
    try {
        // const {id} =req.params
        const {currentUsername, newUsername} = req.body
        const {data} = await axios.patch(
        `${url}/user`, {
            currentUsername,
            newUsername
        }
        )
        res.status(200).send("Username Change")
    } catch (error) {
        res.status(500).send({message:"Username not change"})
    }
}

const patchChangePassword = async (req, res) => {
    try {
        // const {id} = req.params
        const {currentPassword, newPassword, confirmPassword} = req.body
        const respon = await axios.patch(
            `${url}/user`, {
                currentPassword,
                newPassword,
                confirmPassword
            }
        )
        res.status(200).send("Password Change")
    } catch (error) {
        res.status(500).send({message: "Password not change "})
    }
}

const patchChangeEmail = async (req, res) => {
    try {
        const {currentEmail, newEmail} = req.body
        const respon = await axios.patch(
            `${url}/user`, {
                currentEmail,
                newEmail
            }
        )
        res.status(200).send("Email Change")
    } catch (error) {
        res.status(500).send({message:"Email not change"})
    }
}

const patchChangePhone = async (req, res) => {
    try {
        // const {id} = req.params
        const {currentPhone, newPhone} = req.body
        const respon = await axios.pacth(
            `${url}/user`, {
                currentPhone,
                newPhone
            }
        )
        res.status(200).send("Phone Change")
    } catch (error) {
        res.status(500).send({message: "Phone not Change"})
    }
}

const patchResetPassword = async (req, res) => {
    try {
        const {password, confirmPassword} = req.body
        const respon = await axios.get(
            `${url}/user`, {
                password,
                confirmPassword
            }
        )
        res.status(200).json({
            message: "Reset Password Success",
            data: respon
        })
    } catch (error) {
        res.status(500).send({message:"Errorrsss"})
    }
}

const putForgotPassword = async (req, res) => {
    try {
        const {email} = req.body
        const respon = await axios.put(
            `${url}/user`, {
                email
            }
        )
        res.status(200).json({
            message : "Check your email for change password"
        })
    } catch (error) {
        res.status(500).send({message:"Invalid"})
    }
}

module.exports = {getAccount, postAccount, postLogin ,getAccountById, patchChangeUsername, patchChangeEmail, patchChangePassword, patchChangePhone, patchResetPassword, putForgotPassword}