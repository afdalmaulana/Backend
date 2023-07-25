const express = require("express")

const router = express.Router()
const {User} = require("../models")

router.get("/", async(req, res) => {
    try {
        const users = await User.findAll()
        res.json(users)
    } catch (error) {
        res.status(500).json({error : error.message})
    }
    // const users = ["user 1", "user 2", "user 3"]
    // res.json(users)
})

module.exports = router